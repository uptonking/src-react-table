// 本文件只export了useTable一个custom hook，
// 文件主要结构为一系列模块级的代表defaultProps的变量，
// 以及4个func：applyDefaults,useTable,calculateHeaderWidths,accessRowsForColumn
import React from 'react';
import {
  linkColumnStructure,
  flattenColumns,
  assignColumnAccessor,
  unpreparedAccessWarning,
  makeHeaderGroups,
  decorateColumn,
} from '../utils';
import {
  useGetLatest,
  reduceHooks,
  actions,
  loopHooks,
  makePropGetter,
  makeRenderer,
} from '../publicUtils';
import makeDefaultPluginHooks from '../makeDefaultPluginHooks';
import { useColumnVisibility } from './useColumnVisibility';

// 下面的变量都会在applyDefaults()中赋值给props，作为默认值
const defaultInitialState = {};
const defaultColumnInstance = {};
const defaultReducer = (state, action, prevState) => state;
const defaultGetSubRows = (row, index) => row.subRows || [];
const defaultGetRowId = (row, index, parent) =>
  `${parent ? [parent.id, index].join('.') : index}`;
const defaultUseControlledState = d => d;

/**
 * 声明并设置一些重要props的默认值
 * @param {*} props 表格数据及操作相关的options，作为props
 */
function applyDefaults(props) {
  const {
    initialState = defaultInitialState,
    defaultColumn = defaultColumnInstance,
    stateReducer = defaultReducer,
    getSubRows = defaultGetSubRows,
    getRowId = defaultGetRowId,
    useControlledState = defaultUseControlledState,
    ...rest
  } = props;

  return {
    ...rest,
    initialState,
    defaultColumn,
    getSubRows,
    getRowId,
    stateReducer,
    useControlledState,
  };
}

/**
 * react-table的入口hook。
 * 主要流程： 创建保存数据或配置的顶级ref对象 > 通过useReducer创建state > 处理表头 > 计算行和单元格
 * @param {*} props 其实是options，传入数据和配置项，必需包含data,columns。最后会加入到返回对象的属性中。
 * @param  {...any} plugins 支持官方和第三方插件。最后会加入到返回对象的属性中。
 */
export const useTable = (props, ...plugins) => {
  console.log('==useTable');
  console.log('props4useTable, ', props);
  // console.log('plugins, ', plugins);

  // Apply default props
  props = applyDefaults(props);

  // Add core plugins
  plugins = [useColumnVisibility, ...plugins];

  // Create the table instance，
  // ==== 创建存放相关数据及操作的顶级ref对象，包括props,plugins,hooks，也是useTable最后返回的对象
  const instanceRef = React.useRef({});

  // Create a getter for the instance (helps avoid a lot of potential memory leaks)
  // 作者的观点是，保存getter函数引用而不保存数据对象自身，才可以让浏览器自动回收旧的无用的数据对象
  // 因为没有对instanceRef.current创建闭包
  const getInstance = useGetLatest(instanceRef.current);

  // Assign the props, plugins and hooks to the instance，将输入的props，plugins和默认hooks都保存到instanceRef.current
  Object.assign(getInstance(), {
    ...props,
    plugins,
    hooks: makeDefaultPluginHooks(),
  });

  console.log('getInstance-init, ', getInstance());

  // Allow plugins to register hooks as early as possible，给每个plugin传入所有hooks相关配置
  plugins.filter(Boolean).forEach(plugin => {
    plugin(getInstance().hooks);
  });

  // Consume all hooks and make a getter for them
  const getHooks = useGetLatest(getInstance().hooks);
  getInstance().getHooks = getHooks;
  delete getInstance().hooks;

  // Allow useOptions hooks to modify the options coming into the table，
  // 将props传给每个useOption方法，在useOption中可以修改props
  Object.assign(
    getInstance(),
    reduceHooks(getHooks().useOptions, applyDefaults(props)),
  );

  const {
    /** 数据数组 */
    data,
    /** 使用变量别名，代表表头配置 */
    columns: userColumns,
    /** 初始状态 */
    initialState,
    defaultColumn,
    /** state更新时，先执行stateReducer修改state，再更新 */
    stateReducer,
    /** 获取一行的subrows，甚至可以用来创建subrows */
    getSubRows,
    /** 获取每行row的id */
    getRowId,
    /** If you need to control part of table state, this is the place to do it. */
    useControlledState,
  } = getInstance();

  // Setup user reducer ref，用ref保存stateReducer
  const getStateReducer = useGetLatest(stateReducer);

  // Build the reducer，用于更新state的reducer方法
  const reducer = React.useCallback(
    (state, action) => {
      // Detect invalid actions
      if (!action.type) {
        console.info({ action });
        throw new Error('Unknown Action 👆');
      }

      // Reduce the state from all plugin reducers，计算默认和用户的reducer处理后的state
      return [
        ...getHooks().stateReducers,
        // Allow the user to add their own state reducer(s)，在状态更新前修改state
        ...(Array.isArray(getStateReducer())
          ? getStateReducer()
          : [getStateReducer()]),
      ].reduce(
        (s, handler) => handler(s, action, state, getInstance()) || s,
        state,
      );
    },
    [getHooks, getStateReducer, getInstance],
  );

  // Start the reducer，获取最顶级的reducerState状态对象和更新状态的dispatch方法
  // todo ==== reducerState的初始值通过init触发计算得到，是lazy init吗，是不是只计算一次？
  const [reducerState, dispatch] = React.useReducer(reducer, undefined, () => {
    console.log('==init reducerState');
    return reducer(initialState, { type: actions.init });
  });

  // Allow the user to control the final state with hooks，
  // 合并单独控制的部分状态数据，返回值作为table的最顶级state
  const state = reduceHooks(
    [...getHooks().useControlledState, useControlledState],
    reducerState,
    { instance: getInstance() },
  );

  console.log('==state-init', state);

  // 将表格状态及修改状态的方法添加到顶级ref对象
  Object.assign(getInstance(), {
    state,
    dispatch,
  });

  // Decorate All the columns，处理表头列
  const columns = React.useMemo(
    () =>
      linkColumnStructure(
        reduceHooks(getHooks().columns, userColumns, {
          instance: getInstance(),
        }),
      ),
    [
      getHooks,
      getInstance,
      userColumns,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...reduceHooks(getHooks().columnsDeps, [], { instance: getInstance() }),
    ],
  );
  getInstance().columns = columns;

  // Get the flat list of all columns
  // and allow hooks to decorate those columns (and trigger this memoization via deps)
  // 打平所有表头列，方便计算
  let allColumns = React.useMemo(
    () =>
      reduceHooks(getHooks().allColumns, flattenColumns(columns), {
        instance: getInstance(),
      }).map(assignColumnAccessor),
    [
      columns,
      getHooks,
      getInstance,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...reduceHooks(getHooks().allColumnsDeps, [], {
        instance: getInstance(),
      }),
    ],
  );
  getInstance().allColumns = allColumns;

  // Access the row model using initial columns，
  const [rows, flatRows, rowsById] = React.useMemo(() => {
    const rows = [];
    const flatRows = [];
    const rowsById = {};

    const allColumnsQueue = [...allColumns];

    while (allColumnsQueue.length) {
      const column = allColumnsQueue.shift();
      accessRowsForColumn({
        data,
        rows,
        flatRows,
        rowsById,
        column,
        getRowId,
        getSubRows,
        accessValueHooks: getHooks().accessValue,
        getInstance,
      });
    }

    return [rows, flatRows, rowsById];
  }, [allColumns, data, getRowId, getSubRows, getHooks, getInstance]);

  // 向顶级ref对象中添加rows数据
  Object.assign(getInstance(), {
    rows,
    initialRows: [...rows],
    flatRows,
    rowsById,
    // materializedColumns,
  });

  // 数据解析后的处理
  loopHooks(getHooks().useInstanceAfterData, getInstance());

  // Get the flat list of all columns AFTER the rows have been access,
  // and allow hooks to decorate those columns (and trigger this memoization via deps)
  // 对visibleColumns进行样式设置
  let visibleColumns = React.useMemo(
    () =>
      reduceHooks(getHooks().visibleColumns, allColumns, {
        instance: getInstance(),
      }).map(d => decorateColumn(d, defaultColumn)),
    [
      getHooks,
      allColumns,
      getInstance,
      defaultColumn,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...reduceHooks(getHooks().visibleColumnsDeps, [], {
        instance: getInstance(),
      }),
    ],
  );

  // Combine new visible columns with all columns，合并visibleColumns到allColumns
  allColumns = React.useMemo(() => {
    const columns = [...visibleColumns];

    allColumns.forEach(column => {
      if (!columns.find(d => d.id === column.id)) {
        columns.push(column);
      }
    });

    return columns;
  }, [allColumns, visibleColumns]);
  getInstance().allColumns = allColumns;

  if (process.env.NODE_ENV !== 'production') {
    const duplicateColumns = allColumns.filter((column, i) => {
      return allColumns.findIndex(d => d.id === column.id) !== i;
    });

    if (duplicateColumns.length) {
      console.info(allColumns);
      throw new Error(
        `Duplicate columns were found with ids: "${duplicateColumns
          .map(d => d.id)
          .join(', ')}" in the columns array above`,
      );
    }
  }

  // Make the headerGroups，计算分组表头数据，用二维数组存放所有扁平化的表头后
  const headerGroups = React.useMemo(
    () =>
      reduceHooks(
        getHooks().headerGroups,
        makeHeaderGroups(visibleColumns, defaultColumn),
        getInstance(),
      ),
    [
      getHooks,
      visibleColumns,
      defaultColumn,
      getInstance,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...reduceHooks(getHooks().headerGroupsDeps, [], {
        instance: getInstance(),
      }),
    ],
  );
  getInstance().headerGroups = headerGroups;

  // Get the first level of headers，获取嵌套数组形式表示的表头，便于排序
  const headers = React.useMemo(
    () => (headerGroups.length ? headerGroups[0].headers : []),
    [headerGroups],
  );
  getInstance().headers = headers;

  // Provide a flat header list for utilities，扁平化表头方便计算
  getInstance().flatHeaders = headerGroups.reduce(
    (all, headerGroup) => [...all, ...headerGroup.headers],
    [],
  );

  //
  loopHooks(getHooks().useInstanceBeforeDimensions, getInstance());

  // Filter columns down to visible ones，计算visibleColumns的id
  // todo Replace .filter().map() with .reduce()
  const visibleColumnsDep = visibleColumns
    .filter(d => d.isVisible)
    .map(d => d.id)
    .sort()
    .join('_');

  visibleColumns = React.useMemo(
    () => visibleColumns.filter(d => d.isVisible),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleColumns, visibleColumnsDep],
  );
  getInstance().visibleColumns = visibleColumns;

  // Header Visibility is needed by this point，计算表头各列宽度并添加到顶级ref对象
  const [
    totalColumnsMinWidth,
    /** is the total width of all visible columns，不使用table标签时才有用 */
    totalColumnsWidth,
    totalColumnsMaxWidth,
  ] = calculateHeaderWidths(headers);

  getInstance().totalColumnsMinWidth = totalColumnsMinWidth;
  getInstance().totalColumnsWidth = totalColumnsWidth;
  getInstance().totalColumnsMaxWidth = totalColumnsMaxWidth;

  //
  loopHooks(getHooks().useInstance, getInstance());

  // Each materialized header needs to be assigned a render function and other prop getter properties here.
  // 设置要每列要渲染的组件对应的表头组件
  [...getInstance().flatHeaders, ...getInstance().allColumns].forEach(
    column => {
      // Give columns/headers rendering power
      column.render = makeRenderer(getInstance(), column);

      // Give columns/headers a default getHeaderProps，配置表头单元格
      column.getHeaderProps = makePropGetter(getHooks().getHeaderProps, {
        instance: getInstance(),
        column,
      });

      // Give columns/headers a default getFooterProps
      column.getFooterProps = makePropGetter(getHooks().getFooterProps, {
        instance: getInstance(),
        column,
      });
    },
  );

  // 计算分组表头中要显示的表头列
  getInstance().headerGroups = React.useMemo(
    () =>
      headerGroups.filter((headerGroup, i) => {
        // Filter out any headers and headerGroups that don't have visible columns
        headerGroup.headers = headerGroup.headers.filter(column => {
          const recurse = headers =>
            headers.filter(column => {
              if (column.headers) {
                return recurse(column.headers);
              }
              return column.isVisible;
            }).length;
          if (column.headers) {
            return recurse(column.headers);
          }
          return column.isVisible;
        });

        // Give headerGroups getRowProps
        if (headerGroup.headers.length) {
          headerGroup.getHeaderGroupProps = makePropGetter(
            getHooks().getHeaderGroupProps,
            { instance: getInstance(), headerGroup, index: i },
          );

          headerGroup.getFooterGroupProps = makePropGetter(
            getHooks().getFooterGroupProps,
            { instance: getInstance(), headerGroup, index: i },
          );

          return true;
        }

        // 默认返回false，即默认过滤掉
        return false;
      }),
    [headerGroups, getInstance, getHooks],
  );

  // 表尾处理
  getInstance().footerGroups = [...getInstance().headerGroups].reverse();

  // The prepareRow function is absolutely necessary
  // and MUST be called on any rows the user wishes to be displayed.
  // ==== 调用prepareRow()创建要显示的行元素，其中提供了设置单元格的方法。
  // This function is responsible for lazily preparing a row for rendering.
  getInstance().prepareRow = React.useCallback(
    row => {
      row.getRowProps = makePropGetter(getHooks().getRowProps, {
        instance: getInstance(),
        row,
      });

      // Build the visible cells for each row
      row.allCells = allColumns.map(column => {
        const value = row.values[column.id];

        const cell = {
          column,
          row,
          value,
        };

        // Give each cell a getCellProps base
        cell.getCellProps = makePropGetter(getHooks().getCellProps, {
          instance: getInstance(),
          cell,
        });

        // Give each cell a renderer function (supports multiple renderers)
        cell.render = makeRenderer(getInstance(), column, {
          row,
          cell,
          value,
        });

        return cell;
      });

      row.cells = visibleColumns.map(column =>
        row.allCells.find(cell => cell.column.id === column.id),
      );

      // need to apply any row specific hooks (useExpanded requires this)
      loopHooks(getHooks().prepareRow, row, { instance: getInstance() });
    },
    [getHooks, getInstance, allColumns, visibleColumns],
  );

  // getTableProps() is used to resolve any props needed for table wrapper.
  getInstance().getTableProps = makePropGetter(getHooks().getTableProps, {
    instance: getInstance(),
  });

  // is used to resolve any props needed for your table body wrapper.
  getInstance().getTableBodyProps = makePropGetter(
    getHooks().getTableBodyProps,
    {
      instance: getInstance(),
    },
  );

  // 在返回顶级ref对象前，提供修改该对象的机会
  loopHooks(getHooks().useFinalInstance, getInstance());

  // 最后返回的对象其实是 instanceRef.current
  return getInstance();
};

/**
 * 计算表头宽度
 * @param {*} headers
 * @param {*} left
 */
function calculateHeaderWidths(headers, left = 0) {
  let sumTotalMinWidth = 0;
  let sumTotalWidth = 0;
  let sumTotalMaxWidth = 0;
  let sumTotalFlexWidth = 0;

  headers.forEach(header => {
    const { headers: subHeaders } = header;

    header.totalLeft = left;

    if (subHeaders && subHeaders.length) {
      const [
        totalMinWidth,
        totalWidth,
        totalMaxWidth,
        totalFlexWidth,
      ] = calculateHeaderWidths(subHeaders, left);
      header.totalMinWidth = totalMinWidth;
      header.totalWidth = totalWidth;
      header.totalMaxWidth = totalMaxWidth;
      header.totalFlexWidth = totalFlexWidth;
    } else {
      header.totalMinWidth = header.minWidth;
      header.totalWidth = Math.min(
        Math.max(header.minWidth, header.width),
        header.maxWidth,
      );
      header.totalMaxWidth = header.maxWidth;
      header.totalFlexWidth = header.canResize ? header.totalWidth : 0;
    }
    if (header.isVisible) {
      left += header.totalWidth;
      sumTotalMinWidth += header.totalMinWidth;
      sumTotalWidth += header.totalWidth;
      sumTotalMaxWidth += header.totalMaxWidth;
      sumTotalFlexWidth += header.totalFlexWidth;
    }
  });

  return [sumTotalMinWidth, sumTotalWidth, sumTotalMaxWidth, sumTotalFlexWidth];
}

/**
 * 一列一列的获取行中的数据
 * @param {*} param0 包含数据的行对象
 */
function accessRowsForColumn({
  data,
  rows,
  flatRows,
  rowsById,
  column,
  getRowId,
  getSubRows,
  accessValueHooks,
  getInstance,
}) {
  // Access the row's data column-by-column
  // We do it this way so we can incrementally add materialized
  // columns after the first pass and avoid excessive looping
  const accessRow = (originalRow, rowIndex, depth = 0, parent, parentRows) => {
    // Keep the original reference around
    const original = originalRow;

    const id = getRowId(originalRow, rowIndex, parent);

    let row = rowsById[id];

    // If the row hasn't been created, let's make it
    if (!row) {
      row = {
        id,
        original,
        index: rowIndex,
        depth,
        cells: [{}], // This is a dummy cell
      };

      // Override common array functions (and the dummy cell's getCellProps function)
      // to show an error if it is accessed without calling prepareRow
      row.cells.map = unpreparedAccessWarning;
      row.cells.filter = unpreparedAccessWarning;
      row.cells.forEach = unpreparedAccessWarning;
      row.cells[0].getCellProps = unpreparedAccessWarning;

      // Create the cells and values
      row.values = {};

      // Push this row into the parentRows array
      parentRows.push(row);
      // Keep track of every row in a flat array
      flatRows.push(row);
      // Also keep track of every row by its ID
      rowsById[id] = row;

      // Get the original subrows
      row.originalSubRows = getSubRows(originalRow, rowIndex);

      // Then recursively access them
      if (row.originalSubRows) {
        const subRows = [];
        row.originalSubRows.forEach((d, i) =>
          accessRow(d, i, depth + 1, row, subRows),
        );
        // Keep the new subRows array on the row
        row.subRows = subRows;
      }
    } else if (row.subRows) {
      // If the row exists, then it's already been accessed
      // Keep recursing, but don't worry about passing the
      // accumlator array (those rows already exist)
      row.originalSubRows.forEach((d, i) => accessRow(d, i, depth + 1, row));
    }

    // If the column has an accessor, use it to get a value
    if (column.accessor) {
      row.values[column.id] = column.accessor(originalRow, rowIndex, row);
    }

    // Allow plugins to manipulate the column value
    row.values[column.id] = reduceHooks(
      accessValueHooks,
      row.values[column.id],
      {
        row,
        column,
        instance: getInstance(),
      },
      true,
    );
  };

  data.forEach((originalRow, rowIndex) =>
    accessRow(originalRow, rowIndex, 0, undefined, rows),
  );
}

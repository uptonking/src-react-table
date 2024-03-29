import { defaultColumn, emptyRenderer } from './publicUtils';

/** Find the depth of the columns */
export function findMaxDepth(columns, depth = 0) {
  return columns.reduce((prev, curr) => {
    if (curr.columns) {
      return Math.max(prev, findMaxDepth(curr.columns, depth + 1));
    }
    return depth;
  }, 0);
}

/**
 * 递归计算每个表头的信息，特别是所处的层级depth。
 * Build the visible columns, headers and flat column list
 */
export function linkColumnStructure(columns, parent, depth = 0) {
  return columns.map((column) => {
    column = {
      ...column,
      parent,
      depth,
    };

    assignColumnAccessor(column);

    if (column.columns) {
      column.columns = linkColumnStructure(column.columns, column, depth + 1);
    }
    return column;
  });
}
/** 将columns表头数组打平成元素不包含columns的一维数组，便于以后计算 */
export function flattenColumns(columns) {
  return flattenBy(columns, 'columns');
}

/**
 * 给每个表头column添加获取该列数据的方法accessor以及id，若为传入id，则id使用accessor或Header
 */
export function assignColumnAccessor(column) {
  // First check for string accessor
  let { id, accessor, Header } = column;

  if (typeof accessor === 'string') {
    id = id || accessor;
    const accessorPath = accessor.split('.');
    accessor = (row) => getBy(row, accessorPath);
  }

  if (!id && typeof Header === 'string' && Header) {
    id = Header;
  }

  if (!id && column.columns) {
    console.error(column);
    throw new Error('A column ID (or unique "Header" value) is required!');
  }

  if (!id) {
    console.error(column);
    throw new Error('A column ID (or string accessor) is required!');
  }

  Object.assign(column, {
    id,
    accessor,
  });

  return column;
}
/**
 * 设置表头各列要渲染的组件，可以是默认的emptyRenderer或自定义传入的。
 * @param {*} column 表头列
 * @param {*} userDefaultColumn 该列要渲染header和footer组件
 */
export function decorateColumn(column, userDefaultColumn) {
  if (!userDefaultColumn) {
    throw new Error();
  }
  Object.assign(column, {
    // Make sure there is a fallback header, just in case
    Header: emptyRenderer,
    Footer: emptyRenderer,
    // 这里设置了单元格默认的渲染组件
    ...defaultColumn,
    ...userDefaultColumn,
    ...column,
  });

  Object.assign(column, {
    originalWidth: column.width,
  });

  return column;
}

/**
 * Build the header groups from the bottom up.
 * 根据扁平后的表头列数组创建树型表头结构，先创建叶节点表头，再创建父节点表头直到根节点。
 * @param {*} allColumns column表头构成的一维数组
 * @param {*} defaultColumn 默认列组件
 * @param {*} additionalHeaderProperties 表头属性
 */
export function makeHeaderGroups(
  allColumns,
  defaultColumn,
  additionalHeaderProperties = () => ({}),
) {
  const headerGroups = [];

  let scanColumns = allColumns;

  let uid = 0;
  const getUID = () => uid++;

  while (scanColumns.length) {
    // The header group we are creating
    const headerGroup = {
      headers: [],
    };

    // The parent columns we're going to scan next
    const parentColumns = [];

    const hasParents = scanColumns.some((d) => d.parent);

    // Scan each column for parents
    scanColumns.forEach((column) => {
      // What is the latest (last) parent column?
      const latestParentColumn = [...parentColumns].reverse()[0];

      let newParent;

      if (hasParents) {
        // If the column has a parent, add it if necessary
        // 若当前表头存在parent，则创建parent表头对象
        if (column.parent) {
          newParent = {
            ...column.parent,
            originalId: column.parent.id,
            id: `${column.parent.id}_${getUID()}`,
            headers: [column],
            ...additionalHeaderProperties(column),
          };
        } else {
          // If other columns have parents, we'll need to add a place holder if necessary
          // 若当前表头不存在parent，则创建一个placeholder的表头对象
          const originalId = `${column.id}_placeholder`;
          newParent = decorateColumn(
            {
              originalId,
              id: `${column.id}_placeholder_${getUID()}`,
              placeholderOf: column,
              headers: [column],
              ...additionalHeaderProperties(column),
            },
            defaultColumn,
          );
        }

        // If the resulting parent columns are the same,
        // just add the column and increment the header span
        if (
          latestParentColumn &&
          latestParentColumn.originalId === newParent.originalId
        ) {
          latestParentColumn.headers.push(column);
        } else {
          parentColumns.push(newParent);
        }
      }

      headerGroup.headers.push(column);
    });

    headerGroups.push(headerGroup);

    // Start scanning the parent columns
    scanColumns = parentColumns;
  }

  return headerGroups.reverse();
}

const pathObjCache = new Map();

/**
 * 从一个对象的属性路径中取值
 * @param {*} obj  对象
 * @param {*} path 属性对应的路径
 * @param {*} def 若属性值不存在，则返回这个默认值
 */
export function getBy(obj, path, def) {
  if (!path) {
    return obj;
  }
  const cacheKey = typeof path === 'function' ? path : JSON.stringify(path);

  const pathObj =
    pathObjCache.get(cacheKey) ||
    (() => {
      const pathObj = makePathArray(path);
      pathObjCache.set(cacheKey, pathObj);
      return pathObj;
    })();

  let val;

  try {
    val = pathObj.reduce((cursor, pathPart) => cursor[pathPart], obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

export function getFirstDefined(...args) {
  for (let i = 0; i < args.length; i += 1) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}

export function getElementDimensions(element) {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const margins = {
    left: parseInt(style.marginLeft),
    right: parseInt(style.marginRight),
  };
  const padding = {
    left: parseInt(style.paddingLeft),
    right: parseInt(style.paddingRight),
  };
  return {
    left: Math.ceil(rect.left),
    width: Math.ceil(rect.width),
    outerWidth: Math.ceil(
      rect.width + margins.left + margins.right + padding.left + padding.right,
    ),
    marginLeft: margins.left,
    marginRight: margins.right,
    paddingLeft: padding.left,
    paddingRight: padding.right,
    scrollWidth: element.scrollWidth,
  };
}

export function isFunction(a) {
  if (typeof a === 'function') {
    return a;
  }
}

/** 将数组arr的元素中存在key属性的元素提升到arr数组，最终返回合并key属性值的一维数组 */
export function flattenBy(arr, key) {
  const flat = [];

  const recurse = (arr) => {
    arr.forEach((d) => {
      if (!d[key]) {
        flat.push(d);
      } else {
        recurse(d[key]);
      }
    });
  };

  recurse(arr);

  return flat;
}

export function expandRows(
  rows,
  { manualExpandedKey, expanded, expandSubRows = true },
) {
  const expandedRows = [];

  const handleRow = (row) => {
    row.isExpanded =
      (row.original && row.original[manualExpandedKey]) || expanded[row.id];

    row.canExpand = row.subRows && !!row.subRows.length;

    expandedRows.push(row);

    if (expandSubRows && row.subRows && row.subRows.length && row.isExpanded) {
      row.subRows.forEach(handleRow);
    }
  };

  rows.forEach(handleRow);

  return expandedRows;
}

export function getFilterMethod(filter, userFilterTypes, filterTypes) {
  return (
    isFunction(filter) ||
    userFilterTypes[filter] ||
    filterTypes[filter] ||
    filterTypes.text
  );
}

export function shouldAutoRemoveFilter(autoRemove, value, column) {
  return autoRemove ? autoRemove(value, column) : typeof value === 'undefined';
}

export function unpreparedAccessWarning() {
  throw new Error(
    'React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.',
  );
}

let passiveSupported = null;
export function passiveEventSupported() {
  // memoize support to avoid adding multiple test events
  if (typeof passiveSupported === 'boolean') return passiveSupported;

  let supported = false;
  try {
    const options = {
      get passive() {
        supported = true;
        return false;
      },
    };

    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (err) {
    supported = false;
  }
  passiveSupported = supported;
  return passiveSupported;
}

//

const reOpenBracket = /\[/g;
const reCloseBracket = /\]/g;

function makePathArray(obj) {
  return (
    flattenDeep(obj)
      // remove all periods in parts
      .map((d) => String(d).replace('.', '_'))
      // join parts using period
      .join('.')
      // replace brackets with periods
      .replace(reOpenBracket, '.')
      .replace(reCloseBracket, '')
      // split it back out on periods
      .split('.')
  );
}

function flattenDeep(arr, newArr = []) {
  if (!Array.isArray(arr)) {
    newArr.push(arr);
  } else {
    for (let i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

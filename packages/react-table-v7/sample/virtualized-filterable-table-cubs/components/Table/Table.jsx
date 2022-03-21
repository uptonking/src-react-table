import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import {
  useAsyncDebounce,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from '../../../../src/react-table';
import useDependencyDebugger from '../../hooks/useDependencyDebugger';
import { useResizeColumns } from '../../hooks/useResizeColumns';
import useScrollSync from '../../hooks/useScrollSync';
import { getScrollbarWidth } from '../../utils';
import Checkbox from '../Checkbox';
import IconButton from '../IconButton';
import RadioButton from '../RadioButton';
import ColumnHeaders from './ColumnHeaders';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import getProcessedColumns from './getProcessedColumns';

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
`;
const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const TableInside = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  font-size: 12px;
`;

const RowSelectionCheckbox = styled(Checkbox)`
  margin: 0;
  margin-top: 2px;
`;
const RowSelectionRadioButton = styled(RadioButton)`
  margin: 0;
  margin-top: 2px;
`;

const Pre = styled.pre`
  max-height: 100px;
  overflow: auto;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 0;
  padding: 20px;
`;
const DetailsRowExpanderIconButton = styled(IconButton)`
  margin-left: -2px;
  transform: rotate(${({ isExpanded }) => (isExpanded ? 90 : 0)}deg);
`;

const headerProps = (props, { column }) => getStyles(props, column.align, true);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

const getStyles = (props, align = 'start', isHeader) => [
  props,
  {
    style: {
      justifyContent: align === 'end' ? 'flex-end' : 'flex-start',
      textAlign: align === 'end' ? 'end' : 'start',
      alignItems: isHeader ? 'stretch' : 'flex-start',
      display: 'flex',
      flexDirection: isHeader && align === 'end' ? 'row-reverse' : 'row',
    },
  },
];

export const TableContext = createContext();
export const useTableContext = () => useContext(TableContext);

const Table = (props) => {
  const {
    actions = [],
    actionsLimit = 3,
    collapsed,
    collapsible,
    columns,
    data,
    debug,
    defaultColumn,
    defaultFilers,
    defaultFilterModel,
    defaultSortModel,
    density = 'default',
    detailRow,
    disableClearFilters,
    disableClearFiltersButton,
    disableDensity,
    disableDensityButton,
    disableHeader,
    filters,
    isRowSelectable,
    onFilter,
    onMount,
    onReset,
    onSelect,
    onSort,
    onToggleCollapsed,
    rowSelection,
    rowVirtualizationBuffer = 25,
    selectedRowIds,
    skipRerenderOnDataChange,
    sortBy,
    updateData,
  } = props;

  const [draggedHeader, setDraggedHeader] = useState();
  const [draggedHoveredHeaderIndex, setDraggedHoveredHeaderIndex] = useState();
  const [draggedIndex, setDraggedIndex] = useState();
  const [columnDimensions, setColumnDimensions] = useState([]);
  const [rowDensity, setRowDensity] = useState(density);
  const tbodyRef = useRef();
  const theadRef = useRef();
  const pinnedBottomRowRef = useRef();
  const pinnedTopRowRef = useRef();
  const columnHeadersRef = useRef([]);
  const scrollbarWidth = useMemo(() => getScrollbarWidth(), []);
  const mounted = useRef(false);

  useEffect(() => {
    // TODO: Add the following to onMount:
    // selectAll,
    // deselectAll,
    // select,
    // getSortModel,
    // setSortModel,
    // filterModel,
    // setFilterModel,
    // collapseAll,
    // expandAll,
    // expand
    // refresh,
    // export
    // rerender,
    // reset,
    // setRowDensity (?)

    if (onMount && typeof onMount === 'function') onMount({});
    mounted.current = true;
  }, [onMount]);

  useEffect(() => {
    setRowDensity((rowDensity) =>
      density !== rowDensity ? density : rowDensity,
    );
  }, [density, setRowDensity]);

  const detailRowExpanderColumn = useMemo(
    () => ({
      id: 'detailRowExpander',
      minWidth: 36,
      width: 36,
      maxWidth: 36,

      hideMenu: true,
      disableResizing: true,
      disableOrdering: false,
      pinned: 'left',

      Header: () => null,
      Cell: ({ row }) => (
        <DetailsRowExpanderIconButton
          {...row.getToggleRowExpandedProps()}
          type='chevron-right'
          size='xs'
          isExpanded={row.isExpanded}
        />
      ),
    }),
    [],
  );

  const selectionColumn = useMemo(
    () => ({
      id: 'selection',
      minWidth: 36,
      width: 36,
      maxWidth: 36,

      hideMenu: true,
      disableResizing: true,
      disableOrdering: false,
      pinned: 'left',

      Header: ({ getToggleAllRowsSelectedProps }) =>
        rowSelection === 'single' ? null : (
          <RowSelectionCheckbox {...getToggleAllRowsSelectedProps()} />
        ),
      Cell: ({ row }) =>
        rowSelection === 'single' ? (
          <RowSelectionRadioButton
            {...row.getToggleRowSelectedProps()}
            disabled={
              isRowSelectable && typeof isRowSelectable === 'function'
                ? !isRowSelectable(row)
                : undefined
            }
          />
        ) : (
          <RowSelectionCheckbox
            disabled={
              isRowSelectable && typeof isRowSelectable === 'function'
                ? !isRowSelectable(row)
                : undefined
            }
            {...row.getToggleRowSelectedProps()}
          />
        ),
    }),
    [rowSelection, isRowSelectable],
  );

  const processedColumns = useMemo(
    () => getProcessedColumns(columns, defaultColumn),
    [columns, defaultColumn],
  );

  const getFlatColumns = useCallback(
    (columns) => {
      const reduceColumns = (acc, col) =>
        col.columns ? col.columns.reduce(reduceColumns, acc) : [...acc, col];

      return columns.reduce(reduceColumns, [
        selectionColumn,
        detailRowExpanderColumn,
      ]);
    },
    [selectionColumn, detailRowExpanderColumn],
  );

  const initialFlatColumns = useMemo(
    () => getFlatColumns(columns),
    [columns, getFlatColumns],
  );

  const initialColumnOrder = initialFlatColumns.map(
    (col) => col.id || col.accessor,
  );

  const initialSortBy = useMemo(
    () =>
      initialFlatColumns
        .filter((col) => col.sort)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((col) => ({
          id: col.id || col.accessor,
          desc: col.sort === 'desc',
        })),
    [initialFlatColumns],
  );

  const initialFilters = useMemo(() => [], []);
  const initialHiddenColumns = useMemo(
    () =>
      initialFlatColumns
        .filter((col) => col.hidden)
        .map((col) => col.accessor || col.id),
    [initialFlatColumns],
  );

  const shouldUpdateFilters = useRef(false);

  useEffect(() => {
    shouldUpdateFilters.current = true;
  }, [filters]);

  const {
    allColumns,
    visibleColumns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    preGlobalFilteredRows,
    preFilteredRows,
    setGlobalFilter,
    setColumnOrder,
    setAllFilters,
    toggleRowSelected,
    toggleAllRowsSelected,
    setSortBy,
    setHiddenColumns,
    resetResizing,
  } = useTable(
    {
      columns: processedColumns,
      data,
      updateData,
      autoResetPage: !skipRerenderOnDataChange,
      autoResetExpanded: !skipRerenderOnDataChange,
      autoResetGroupBy: !skipRerenderOnDataChange,
      autoResetSelectedRows: !skipRerenderOnDataChange,
      autoResetSortBy: !skipRerenderOnDataChange,
      autoResetFilters: !skipRerenderOnDataChange,
      autoResetRowState: !skipRerenderOnDataChange,
      // defaultColumn,
      initialState: {
        columnOrder: initialColumnOrder,
        filters: filters || initialFilters,
        sortBy: initialSortBy,
        hiddenColumns: initialHiddenColumns,
      },
      getRowId: (row, relativeIndex, parent) =>
        parent
          ? [parent.id, row.id || relativeIndex].join('.')
          : row.id || relativeIndex,
      stateReducer: (newState, action) => {
        if (rowSelection === 'single' && action.type === 'toggleRowSelected') {
          newState.selectedRowIds = {
            [action.id]: true,
          };
        }

        return newState;
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
    useFlexLayout,
    useResizeColumns,
    useColumnOrder,
    (hooks) =>
      hooks.visibleColumns.push((columns) => [
        ...(rowSelection ? [selectionColumn] : []),
        ...(detailRow ? [detailRowExpanderColumn] : []),
        ...columns,
      ]),
  );

  const {
    filters: stateFilters,
    sortBy: stateSortBy,
    columnOrder,
    selectedRowIds: stateSelectedRowIds,
  } = state;

  // Manage filters state externally

  const settingFilters = useRef(false);

  useEffect(() => {
    if (filters && onFilter) {
      setAllFilters(filters);
      settingFilters.current = true;
    }
  }, [filters, setAllFilters, onFilter]);

  useEffect(() => {
    if (
      !settingFilters.current &&
      JSON.stringify(stateFilters) !== JSON.stringify(filters)
    ) {
      if (onFilter) onFilter(stateFilters);
    } else {
      settingFilters.current = false;
    }
  }, [stateFilters, onFilter, filters]);

  // Manage sortBy state externally

  const settingSortBy = useRef(false);

  useEffect(() => {
    if (sortBy) {
      setSortBy(sortBy);
      settingSortBy.current = true;
    }
  }, [sortBy, setSortBy]);

  useEffect(() => {
    if (
      !settingSortBy.current &&
      JSON.stringify(stateSortBy) !== JSON.stringify(sortBy)
    ) {
      if (onSort) onSort(stateSortBy);
    } else {
      settingSortBy.current = false;
    }
  }, [stateSortBy, onSort, sortBy]);

  // Manage selectedRowIds state externally

  const settingSelectedRowIds = useRef(false);
  const changingSelectedRowIds = useRef(false);
  const previousSelectedRowIds = useRef(selectedRowIds || []);

  useEffect(() => {
    if (selectedRowIds && !changingSelectedRowIds.current) {
      toggleAllRowsSelected(false);
      selectedRowIds.forEach((rowId) => toggleRowSelected(rowId, true));

      previousSelectedRowIds.current = selectedRowIds.sort();
      settingSelectedRowIds.current = true;
    }
    if (changingSelectedRowIds.current) {
      changingSelectedRowIds.current = false;
    }
  }, [selectedRowIds, toggleAllRowsSelected, toggleRowSelected]);

  useEffect(() => {
    const selectedRowIdsArr = Object.keys(stateSelectedRowIds).sort();
    if (
      !settingSelectedRowIds.current &&
      onSelect &&
      JSON.stringify(Object.keys(selectedRowIdsArr).sort()) !==
        JSON.stringify(previousSelectedRowIds.current)
    ) {
      const selectedRows = selectedRowIdsArr.map((id) =>
        data.find((row) => row.id === id),
      );

      onSelect(selectedRows);

      changingSelectedRowIds.current = true;
      previousSelectedRowIds.current = selectedRowIdsArr;
    }

    if (settingSelectedRowIds.current) {
      settingSelectedRowIds.current = false;
    }
  }, [onSelect, stateSelectedRowIds, data, rowSelection]);

  // Manager collapse state externally

  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const transitionDuration = isCollapsed ? 200 : 250;

  const handleCollapseToggle = (...args) => {
    setIsCollapsed((val) => !val);
    if (onToggleCollapsed && typeof onToggleCollapsed === 'function') {
      onToggleCollapsed(...args);
    }
  };

  useEffect(() => {
    setIsCollapsed((val) => (collapsed !== val ? collapsed : val));
  }, [collapsed]);

  const getPinnedColumnIds = useCallback(
    (direction) =>
      visibleColumns
        .filter((col) => col.pinned === direction)
        .map((col) => col.id || col.accessor),
    [visibleColumns],
  );
  const [leftPinnedColumnIds, setLeftPinnedColumnIds] = useState(
    getPinnedColumnIds('left'),
  );
  const [rightPinnedColumnIds, setRightPinnedColumnIds] = useState(
    getPinnedColumnIds('right'),
  );

  const columnResizingWidths = state.columnResizing.columnWidths;
  const resizingColumnId = state.columnResizing.isResizingColumn;

  const resetTable = () => {
    resetResizing();
    setAllFilters([]);
    setGlobalFilter('');
    toggleAllRowsSelected(false);
    setSortBy(initialSortBy);
    setHiddenColumns(initialHiddenColumns);
    setRowDensity(density);
    setTimeout(() => {
      setLeftPinnedColumnIds(getPinnedColumnIds('left'));
      setRightPinnedColumnIds(getPinnedColumnIds('right'));
      setColumnOrder(initialColumnOrder);
      if (onReset && typeof onReset === 'function') onReset();
    });
  };

  const reorder = useCallback(
    (item, newIndex) => {
      const { index } = item;
      let fromIndex = index;
      let toIndex = newIndex;

      // Account for hidden columns
      columnOrder.forEach((colId, i) => {
        const isHidden = state.hiddenColumns.includes(colId);

        if (i <= fromIndex && isHidden) {
          fromIndex++;
        }
        if (i <= toIndex && isHidden) {
          toIndex++;
        }
      });

      const id = columnOrder[fromIndex];

      console.log('Reordering', fromIndex, toIndex, id);

      if (toIndex < leftPinnedColumnIds.length) {
        if (!leftPinnedColumnIds.includes(id))
          setLeftPinnedColumnIds((ids) => [...ids, id]);
      } else if (
        toIndex >
        visibleColumns.length - rightPinnedColumnIds.length - 1
      ) {
        if (!rightPinnedColumnIds.includes(id))
          setRightPinnedColumnIds((ids) => [...ids, id]);
      } else if (leftPinnedColumnIds.includes(id)) {
        setLeftPinnedColumnIds((ids) =>
          ids.filter((pinnedId) => id !== pinnedId),
        );
      } else if (rightPinnedColumnIds.includes(id)) {
        setRightPinnedColumnIds((ids) =>
          ids.filter((pinnedId) => id !== pinnedId),
        );
      }

      setColumnOrder(
        update(columnOrder, {
          $splice: [
            [fromIndex, 1],
            [toIndex, 0, id],
          ],
        }),
      );
    },
    [
      leftPinnedColumnIds,
      rightPinnedColumnIds,
      columnOrder,
      setColumnOrder,
      visibleColumns.length,
      state.hiddenColumns,
    ],
  );

  // sync horizontal scroll between header and body
  const panes = [tbodyRef.current, theadRef.current].filter((pane) => !!pane);

  useScrollSync(panes, { axis: 'x' });

  const handleGlobalFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200,
  );
  const hasPinnedTopRow = useMemo(
    () => visibleColumns.some((col) => col.PinnedTopCell),
    [visibleColumns],
  );
  const hasPinnedBottomRow = useMemo(
    () => visibleColumns.some((col) => col.PinnedBottomCell),
    [visibleColumns],
  );
  const visibleColumnCount = useMemo(
    () => visibleColumns.length,
    [visibleColumns],
  );

  const getColumnDimensions = useCallback(() => {
    const widths = columnHeadersRef.current
      ?.filter((colEl) => !!colEl)
      .map((colEl) => colEl.offsetWidth);

    const dimensions = widths?.map((width, idx) => ({
      width,
      ...widths.reduce(
        ({ left, right }, colWidth, colWidthIdx) => ({
          left: colWidthIdx < idx ? left + colWidth : left,
          right: colWidthIdx > idx ? right + colWidth - 1 : right,
        }),
        { left: 0, right: 0 },
      ),
    }));

    return dimensions;
  }, [columnHeadersRef]);

  useEffect(() => {
    setColumnDimensions(getColumnDimensions());
  }, [
    getColumnDimensions,
    columnResizingWidths,
    columnOrder,
    leftPinnedColumnIds,
    rightPinnedColumnIds,
    visibleColumnCount,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setColumnDimensions(getColumnDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setColumnDimensions, getColumnDimensions]);

  // useDependencyDebugger(
  //   {
  //     onMount,
  //     density,
  //     setRowDensity,
  //     rowSelection,
  //     isRowSelectable,
  //     columns,
  //     defaultColumn,
  //     selectionColumn,
  //     detailRowExpanderColumn,
  //     getFlatColumns,
  //     initialFlatColumns,
  //     filters,
  //     setAllFilters,
  //     stateFilters,
  //     onFilter,
  //     sortBy,
  //     setSortBy,
  //     stateSortBy,
  //     onSort,
  //     selectedRowIds,
  //     stateSelectedRowIds,
  //     toggleAllRowsSelected,
  //     toggleRowSelected,
  //     onSelect,
  //     collapsed,
  //     visibleColumns,
  //     leftPinnedColumnIds,
  //     rightPinnedColumnIds,
  //     columnOrder,
  //     setColumnOrder,
  //     "visibleColumns.length": visibleColumns.length,
  //     "state.hiddenColumns": state.hiddenColumns,
  //     columnHeadersRef,
  //     getColumnDimensions,
  //     columnResizingWidths,
  //     visibleColumnCount,
  //     setColumnDimensions
  //   },
  //   debug
  // );

  // console.log("Table rendered");

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContext.Provider
        value={{
          ...props,
          actions,
          actionsLimit,
          allColumns,
          cellProps,
          collapsible,
          columnDimensions,
          columnHeadersRef,
          defaultFilers,
          defaultFilterModel,
          defaultSortModel,
          detailRow,
          disableClearFilters,
          disableClearFiltersButton,
          disableDensity,
          disableDensityButton,
          draggedHeader,
          draggedHoveredHeaderIndex,
          draggedIndex,
          getTableBodyProps,
          handleCollapseToggle,
          handleGlobalFilterChange,
          hasPinnedBottomRow,
          hasPinnedTopRow,
          headerGroups,
          headerProps,
          leftPinnedColumnIds,
          pinnedBottomRowRef,
          pinnedTopRowRef,
          preFilteredRows,
          preGlobalFilteredRows,
          prepareRow,
          reorder,
          resetTable,
          resizingColumnId,
          rightPinnedColumnIds,
          rowDensity,
          rows,
          rowVirtualizationBuffer,
          scrollbarWidth,
          setDraggedHeader,
          setDraggedHoveredHeaderIndex,
          setDraggedIndex,
          setLeftPinnedColumnIds,
          setRightPinnedColumnIds,
          state,
          tbodyRef,
          theadRef,
          transitionDuration,
          visibleColumns,
        }}
      >
        <TableWrap>
          {!disableHeader && <TableHeader />}
          <TableContent>
            <TableInside {...getTableProps()}>
              <ColumnHeaders />
              <TableBody />
            </TableInside>
          </TableContent>
        </TableWrap>
        {debug && (
          <Pre>
            <code>{JSON.stringify({ state }, null, 2)}</code>
          </Pre>
        )}
      </TableContext.Provider>
    </DndProvider>
  );
};

const columnPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    align: PropTypes.oneOf(['start', 'center', 'end']),
    Cell: PropTypes.func,
    cellClass: PropTypes.string,
    columns: PropTypes.array,
    disableFiltering: PropTypes.bool,
    disableMenu: PropTypes.bool,
    filter: PropTypes.oneOf(['string', 'number', 'date', 'set', false]),
    Header: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    headerClass: PropTypes.string, // TODO
    hidden: PropTypes.bool,
    id: PropTypes.string,
    lockPinned: PropTypes.bool, // TODO: or disablePinning?
    lockPosition: PropTypes.bool, // TODO: or disableReordering?
    lockVisibility: PropTypes.bool, // TODO: or disableHiding? Maybe persistent or alwaysVisible?
    lockSort: PropTypes.bool, // TODO: or disableSorting?
    lockFilter: PropTypes.bool, // TODO: or disableFiltering? Maybe not required?
    maxWidth: PropTypes.number,
    menuItems: PropTypes.arrayOf([
      // TODO
      PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        items: PropTypes.array, // TODO: look at whether or not to rename this, sync with icon group component
      }),
    ]),
    resizable: PropTypes.bool,
    PinnedBottomCell: PropTypes.func,
    PinnedTopCell: PropTypes.func,
    sort: PropTypes.string, // TODO
    type: PropTypes.oneOf([
      // TODO: verify each of these exist
      'currency',
      'date',
      'indicator',
      'number',
      'buttons',
    ]),
    width: PropTypes.number,
  }),
);

Table.propTypes = {
  columns: columnPropTypes,
  data: PropTypes.array,
  debug: PropTypes.bool,
  density: PropTypes.oneOf(['default', 'comfortable', 'compact']),
  detailRow: PropTypes.func,
  disableColumnFiltering: PropTypes.bool,
  disableColumnMenus: PropTypes.bool,
  disableColumnPinning: PropTypes.bool,
  disableColumnReordering: PropTypes.bool,
  disableColumnResizing: PropTypes.bool,
  disableColumnSorting: PropTypes.bool,
  disableExport: PropTypes.bool,
  disableGlobalFilter: PropTypes.bool,
  disableReset: PropTypes.bool,
  disableVirtualization: PropTypes.bool,
  exportFileName: PropTypes.string,
  hideFooter: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideQuickFilter: PropTypes.bool,
  hideResetButton: PropTypes.bool,
  hideRowCount: PropTypes.bool,
  isRowSelectable: PropTypes.func,
  loading: PropTypes.bool,
  noRowsMessage: PropTypes.string,
  onChange: PropTypes.func,
  onRefreshData: PropTypes.func,
  onReset: PropTypes.func,
  onSelect: PropTypes.func,
  rowSelection: PropTypes.oneOf(['single', 'multiple', true, false, null]),
  rowVirtualizationBuffer: PropTypes.number,
  skipRerenderOnDataChange: PropTypes.bool,
  title: PropTypes.string,
  updateData: PropTypes.func,
  actions: PropTypes.arrayOf([
    // TODO: rename?
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
      items: PropTypes.array, // TODO: look at whether or not to rename this, sync with column.menuItems and icon group component
    }),
  ]),
  actionsLimit: PropTypes.number,
  defaultColumn: columnPropTypes,
  disableClearFilters: PropTypes.bool,
  disableClearFiltersButton: PropTypes.bool,
  disableDensity: PropTypes.bool,
  disableDensityButton: PropTypes.bool,
  disableExportButton: PropTypes.bool,
  disableGlobalFilterInput: PropTypes.bool,
  disableHeader: PropTypes.bool,
  disableRefreshDataButton: PropTypes.bool,
  disableResetButton: PropTypes.bool,
  disableRowCount: PropTypes.bool,
  onMount: PropTypes.func,
  renderFooterContent: PropTypes.func,
  renderPrimaryActions: PropTypes.func, // TODO: rename?
};

export default Table;

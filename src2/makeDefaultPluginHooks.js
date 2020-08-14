// 本文件结构分两部分，前面全是表格各部分(表头尾、行、列、单元格)的默认属性(主要实现无障碍a11y)，后面是返回插件配置对象的方法
const defaultGetTableProps = props => ({
  role: 'table',
  ...props,
});

const defaultGetTableBodyProps = props => ({
  role: 'rowgroup',
  ...props,
});

const defaultGetHeaderProps = (props, { column }) => ({
  key: `header_${column.id}`,
  colSpan: column.totalVisibleHeaderCount,
  role: 'columnheader',
  ...props,
});

const defaultGetFooterProps = (props, { column }) => ({
  key: `footer_${column.id}`,
  colSpan: column.totalVisibleHeaderCount,
  ...props,
});

const defaultGetHeaderGroupProps = (props, { index }) => ({
  key: `headerGroup_${index}`,
  role: 'row',
  ...props,
});

const defaultGetFooterGroupProps = (props, { index }) => ({
  key: `footerGroup_${index}`,
  ...props,
});

const defaultGetRowProps = (props, { row }) => ({
  key: `row_${row.id}`,
  role: 'row',
  ...props,
});

const defaultGetCellProps = (props, { cell }) => ({
  key: `cell_${cell.row.id}_${cell.column.id}`,
  role: 'cell',
  ...props,
});

/**
 * 返回一个hooks配置对象，包含表格创建及操作的各种配置项，
 * 会被传给所有plugins，同时每个plugin都可以修改这个配置对象，如修改属性值或添加新属性
 */
export default function makeDefaultPluginHooks() {
  return {
    useOptions: [],
    stateReducers: [],
    useControlledState: [],
    columns: [],
    columnsDeps: [],
    allColumns: [],
    allColumnsDeps: [],
    accessValue: [],
    materializedColumns: [],
    materializedColumnsDeps: [],
    useInstanceAfterData: [],
    visibleColumns: [],
    visibleColumnsDeps: [],
    headerGroups: [],
    headerGroupsDeps: [],
    useInstanceBeforeDimensions: [],
    useInstance: [],
    prepareRow: [],
    getTableProps: [defaultGetTableProps],
    getTableBodyProps: [defaultGetTableBodyProps],
    getHeaderGroupProps: [defaultGetHeaderGroupProps],
    getFooterGroupProps: [defaultGetFooterGroupProps],
    getHeaderProps: [defaultGetHeaderProps],
    getFooterProps: [defaultGetFooterProps],
    getRowProps: [defaultGetRowProps],
    getCellProps: [defaultGetCellProps],
    useFinalInstance: [],
  };
}

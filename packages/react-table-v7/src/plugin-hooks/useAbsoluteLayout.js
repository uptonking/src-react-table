// 特点是cell会渲染成绝对定位的div，并且必须设置cell的width
/*
- useAbsoluteLayout表格实现的ui结构层次
- div-table
  - div-thead
    - row-header-group
    - row-header-group
      - columnheader
    - row/header-group
  - rowgroup/rows
    - row-body
    - row-body
      - cell
    - row-body
*/
/** 每个单元格都是绝对定位 */
const cellStyles = {
  position: 'absolute',
  top: 0,
};

export const useAbsoluteLayout = (hooks) => {
  hooks.getTableBodyProps.push(getRowStyles);
  hooks.getRowProps.push(getRowStyles);
  hooks.getHeaderGroupProps.push(getRowStyles);
  hooks.getFooterGroupProps.push(getRowStyles);

  hooks.getHeaderProps.push((props, { column }) => [
    props,
    {
      style: {
        ...cellStyles,
        left: `${column.totalLeft}px`,
        width: `${column.totalWidth}px`,
      },
    },
  ]);

  hooks.getCellProps.push((props, { cell }) => [
    props,
    {
      style: {
        ...cellStyles,
        left: `${cell.column.totalLeft}px`,
        width: `${cell.column.totalWidth}px`,
      },
    },
  ]);

  hooks.getFooterProps.push((props, { column }) => [
    props,
    {
      style: {
        ...cellStyles,
        left: `${column.totalLeft}px`,
        width: `${column.totalWidth}px`,
      },
    },
  ]);
};

useAbsoluteLayout.pluginName = 'useAbsoluteLayout';

const getRowStyles = (props, { instance }) => [
  props,
  {
    style: {
      position: 'relative',
      width: `${instance.totalColumnsWidth}px`,
    },
  },
];

// 特点是cell会渲染成inline-block，并且必须设置cell的width
/*
- useBlockLayout表格实现的ui结构层次
- div-table
  - div-thead
    - row/tr
    - row/tr
      - columnheader/th
    - row/tr
  - div-tbody/rowgroup
    - row/tr
    - row/tr
      - cell/td
    - row/tr
*/
/** 表头单元格和数据单元格都渲染成inline-block */
const cellStyles = {
  display: 'inline-block',
  boxSizing: 'border-box',
};

/** 每一行的宽度都计算出来，再通过行内样式style object添加到代表行的div */
const getRowStyles = (props, { instance }) => [
  props,
  {
    style: {
      display: 'flex',
      width: `${instance.totalColumnsWidth}px`,
    },
  },
];

export const useBlockLayout = hooks => {
  hooks.getRowProps.push(getRowStyles);
  hooks.getHeaderGroupProps.push(getRowStyles);
  hooks.getFooterGroupProps.push(getRowStyles);
  hooks.getHeaderProps.push((props, { column }) => [
    props,
    {
      style: {
        ...cellStyles,
        width: `${column.totalWidth}px`,
      },
    },
  ]);

  hooks.getCellProps.push((props, { cell }) => [
    props,
    {
      style: {
        ...cellStyles,
        width: `${cell.column.totalWidth}px`,
      },
    },
  ]);

  hooks.getFooterProps.push((props, { column }) => [
    props,
    {
      style: {
        ...cellStyles,
        width: `${column.totalWidth}px`,
      },
    },
  ]);
};

useBlockLayout.pluginName = 'useBlockLayout';

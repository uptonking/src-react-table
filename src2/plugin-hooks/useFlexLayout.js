// 特点是cell会渲染成flex item且自身也是flex container，cell的width由flex-basis/grow控制
/*
- useFlexLayout表格实现的ui结构层次
- div-table
  - div-thead
    - row-tr
    - row-tr
      - columnheader
    - row-tr
  - div-tbody
    - row-tr
    - row-tr
      - cell
    - row-tr
*/
export function useFlexLayout(hooks) {
  hooks.getTableProps.push(getTableProps);
  hooks.getRowProps.push(getRowStyles);
  hooks.getHeaderGroupProps.push(getRowStyles);
  hooks.getFooterGroupProps.push(getRowStyles);
  hooks.getHeaderProps.push(getHeaderProps);
  hooks.getCellProps.push(getCellProps);
  hooks.getFooterProps.push(getFooterProps);
}

useFlexLayout.pluginName = 'useFlexLayout';

const getTableProps = (props, { instance }) => [
  props,
  {
    style: {
      minWidth: `${instance.totalColumnsWidth}px`,
    },
  },
];

const getRowStyles = (props, { instance }) => [
  props,
  {
    style: {
      display: 'flex',
      flex: '1 0 auto',
      minWidth: `${instance.totalColumnsMinWidth}px`,
    },
  },
];

const getHeaderProps = (props, { column }) => [
  props,
  {
    style: {
      boxSizing: 'border-box',
      flex: column.totalFlexWidth
        ? `${column.totalFlexWidth} 0 auto`
        : undefined,
      minWidth: `${column.totalMinWidth}px`,
      width: `${column.totalWidth}px`,
    },
  },
];

const getCellProps = (props, { cell }) => [
  props,
  {
    style: {
      boxSizing: 'border-box',
      flex: `${cell.column.totalFlexWidth} 0 auto`,
      minWidth: `${cell.column.totalMinWidth}px`,
      width: `${cell.column.totalWidth}px`,
    },
  },
];

const getFooterProps = (props, { column }) => [
  props,
  {
    style: {
      boxSizing: 'border-box',
      flex: column.totalFlexWidth
        ? `${column.totalFlexWidth} 0 auto`
        : undefined,
      minWidth: `${column.totalMinWidth}px`,
      width: `${column.totalWidth}px`,
    },
  },
];

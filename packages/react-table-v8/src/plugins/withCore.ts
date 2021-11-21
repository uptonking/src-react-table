import React from 'react';
import { defaultPlugs } from '../core/makePlugs';
import {
  TableInstance,
  UseReduceOptions,
  UseInstanceAfterState,
  ColumnId,
  ReduceTableBodyProps,
  TableBodyProps,
  TableOptions,
  DecorateHeader,
  Header,
  HeaderProps,
  ReduceHeaderProps,
  ReduceFooterProps,
  ReduceTableProps,
  TableProps,
} from '../types';
import { makeRenderer } from '../utils';

interface CoreTableInstanceAfterState extends TableInstance {
  reset: () => void;
  getColumnWidth: (id?: ColumnId) => number;
  getTotalWidth: () => number;
}

interface CoreTableProps extends TableProps {
  role?: string;
}

interface CoreTableBodyProps extends TableBodyProps {
  role?: string;
}

interface WithCoreHeaderProps extends HeaderProps {
  key: string;
  role?: string;
}

//

const useReduceOptions: UseReduceOptions<TableOptions, TableInstance> = (
  options: any,
) => {
  return {
    data: [],
    columns: [],
    debug: false,
    initialState: {},
    state: {},
    onStateChange: (d) => d,
    getSubRows: (row: { subRows?: unknown[] }) => row.subRows || [],
    getRowId: (_row, index, parent) =>
      `${parent ? [parent.id, index].join('.') : index}`,
    ...options,
  };
};

const useInstanceAfterState: UseInstanceAfterState<
  TableInstance,
  CoreTableInstanceAfterState
> = (instance) => {
  const reset = React.useCallback(() => {
    // It's possible that in the future, this function is pluggable
    // and allows other plugins to add their own reset functionality
    instance.setState(instance.options.initialState);
  }, [instance]);

  const getColumnWidth = React.useCallback(
    (columnId) => {
      const column = instance.leafColumns.find((d) => d.id === columnId);
      if (!column) {
        return 0;
      }
      return Math.min(
        Math.max(column.minWidth ?? 0, column.width ?? 0),
        column.maxWidth ?? 0,
      );
    },
    [instance.leafColumns],
  );

  const getTotalWidth = React.useCallback(() => {
    return instance.leafColumns.reduce(
      (sum, column) => sum + (column.getWidth() ?? 0),
      0,
    );
  }, [instance.leafColumns]);

  return {
    ...instance,
    reset,
    getColumnWidth,
    getTotalWidth,
  };
};

const reduceTableProps: ReduceTableProps<CoreTableProps, TableInstance> = (
  props: any,
) => ({
  role: 'table',
  ...props,
});

const reduceTableBodyProps: ReduceTableBodyProps<
  CoreTableBodyProps,
  TableInstance
> = (props: any) => ({
  role: 'rowgroup',
  ...props,
});

const reduceHeaderProps: ReduceHeaderProps<
  HeaderProps,
  WithCoreHeaderProps,
  TableInstance,
  Header
> = (props, { header }) => ({
  key: header.id,
  role: 'columnheader',
  ...props,
});

// Give columns/headers a default getFooterProps
const reduceFooterProps: ReduceFooterProps<
  HeaderProps,
  HeaderProps,
  TableInstance,
  Header
> = (props, { header }) => ({
  key: header.id,
  role: 'columnfooter',
  ...props,
});

const decorateHeader: DecorateHeader<Header, Header, TableInstance> = (
  header,
  { instance },
) => {
  header.render = header.isPlaceholder
    ? () => null
    : makeRenderer(instance, {
        column: header.column,
      });

  header.getWidth = () => {
    let sum = 0;

    const recurse = (header: Header) => {
      if (header.subHeaders.length) {
        header.subHeaders.forEach(recurse);
      } else {
        sum += header.column.getWidth() ?? 0;
      }
    };

    recurse(header);

    return sum;
  };

  return header;
};

// const decorateRow: DecorateRow = (
//   row: Row,
//   { instance }: { instance: TableInstance }
// ) => {
//   row.getRowProps = (props = {}) =>
//     instance.plugs.reduceRowProps(
//       { key: row.id, role: 'row', ...props },
//       { instance, row }
//     ) ?? {}

//   return row
// }

// const decorateCell: DecorateCell = (
//   cell: Cell,
//   { instance }: { instance: TableInstance }
// ) => {
//   cell.getCellProps = (props = {}) =>
//     instance.plugs.reduceCellProps(
//       {
//         key: cell.id,
//         role: 'gridcell',
//         ...props,
//       },
//       {
//         instance,
//         cell,
//       }
//     ) ?? {}

//   return cell
// }

export const withCore = {
  name: 'withCore',
  after: [],
  plugs: {
    ...defaultPlugs,
    useReduceOptions,
    useInstanceAfterState,
    reduceTableProps,
    reduceTableBodyProps,
    reduceHeaderProps,
    reduceFooterProps,
    decorateHeader,
    // decorateRow,
    // decorateCell,
  },
};

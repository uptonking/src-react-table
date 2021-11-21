import React from 'react';

import {
  buildHeaderGroups,
  recurseHeaderForSpans,
  flattenBy,
  makeStateUpdater,
} from '../utils';

import {
  withColumnPinning as name,
  withColumnVisibility,
  withColumnOrder,
} from '../Constants';
import {
  DecorateColumn,
  UseInstanceAfterState,
  UseReduceFlatHeaders,
  UseReduceFooterGroups,
  UseReduceHeaderGroups,
  UseReduceLeafColumns,
  UseReduceOptions,
} from '../types';

const useReduceOptions: UseReduceOptions = (options) => {
  return {
    onColumnPinningChange: React.useCallback(
      makeStateUpdater('columnPinning'),
      [],
    ),
    ...options,
    initialState: {
      ...options.initialState,
      columnPinning: {
        left: [],
        right: [],
        ...options.initialState?.columnPinning,
      },
    },
  };
};

const useInstanceAfterState: UseInstanceAfterState = (instance) => {
  const columnPinningLeft = instance.state.columnPinning?.left;
  const columnPinningRight = instance.state.columnPinning?.right;

  instance.setColumnPinning = React.useCallback(
    (updater) => instance.options.onColumnPinningChange?.(updater, instance),
    [instance],
  );

  instance.resetColumnPinning = React.useCallback(
    () =>
      instance.setColumnPinning(
        instance.options.initialState?.columnPinning ?? {},
      ),
    [instance],
  );

  instance.toggleColumnPinning = React.useCallback(
    (columnId, side, value) => {
      instance.setColumnPinning((old) => {
        const isIncluded = old?.[side]?.includes(columnId);

        value = typeof value !== 'undefined' ? value : !isIncluded;

        return {
          ...old,
          [side]: value
            ? [...(old?.[side] ?? []), columnId]
            : old?.[side]?.filter((d) => d !== columnId) ?? [],
        };
      });
    },
    [instance],
  );

  instance.getColumnCanPin = React.useCallback(
    (columnId) => {
      const column = instance.leafColumns.find((d) => d.id === columnId);

      if (!column) {
        return false;
      }

      return (
        (column.disablePinning ? false : undefined) ??
        (instance.options.disablePinning ? false : undefined) ??
        column.defaultCanPin ??
        !!column.accessor
      );
    },
    [instance.leafColumns, instance.options.disablePinning],
  );

  instance.getColumnIsPinned = React.useCallback(
    (columnId) => {
      return columnPinningLeft?.includes(columnId)
        ? 'left'
        : columnPinningRight?.includes(columnId)
        ? 'right'
        : false;
    },
    [columnPinningLeft, columnPinningRight],
  );

  instance.getColumnPinnedIndex = React.useCallback(
    (columnId) => {
      const side = instance.getColumnIsPinned(columnId);
      return side
        ? instance.state.columnPinning?.[side]?.indexOf(columnId) ?? -1
        : 0;
    },
    [instance],
  );

  return instance;
};

const decorateColumn: DecorateColumn = (column, { instance }) => {
  column.getCanPin = () => instance.getColumnCanPin(column.id);
  column.getPinnedIndex = () => instance.getColumnPinnedIndex(column.id);
  column.getIsPinned = () => instance.getColumnIsPinned(column.id);
  column.togglePinning = (side, value) =>
    instance.toggleColumnPinning(column.id, side, value);

  return column;
};

const useReduceLeafColumns: UseReduceLeafColumns = (
  leafColumns,
  { instance },
) => {
  const columnPinningLeft = instance.state.columnPinning?.left;
  const columnPinningRight = instance.state.columnPinning?.right;

  instance.centerLeafColumns = React.useMemo(() => {
    if (columnPinningLeft?.length || columnPinningRight?.length) {
      return leafColumns.filter(
        (column) =>
          !columnPinningLeft?.includes(column.id) &&
          !columnPinningRight?.includes(column.id),
      );
    }
    return leafColumns;
  }, [columnPinningLeft, columnPinningRight, leafColumns]);

  instance.leftLeafColumns = React.useMemo(() => {
    return (
      (columnPinningLeft
        ?.map((columnId) => leafColumns.find((d) => d.id === columnId))
        .filter(Boolean) as typeof leafColumns) ?? []
    );
  }, [columnPinningLeft, leafColumns]);

  instance.rightLeafColumns = React.useMemo(() => {
    return (
      (columnPinningRight
        ?.map((columnId) => leafColumns.find((d) => d.id === columnId))
        .filter(Boolean) as typeof leafColumns) ?? []
    );
  }, [columnPinningRight, leafColumns]);

  return leafColumns;
};

const useReduceHeaderGroups: UseReduceHeaderGroups = (
  headerGroups,
  { instance },
) => {
  const { columns, centerLeafColumns, leftLeafColumns, rightLeafColumns } =
    instance;

  instance.centerHeaderGroups = React.useMemo(
    () => buildHeaderGroups(columns, centerLeafColumns, { instance }),
    [centerLeafColumns, columns, instance],
  );

  instance.leftHeaderGroups = React.useMemo(
    () => buildHeaderGroups(columns, leftLeafColumns, { instance }),
    [columns, instance, leftLeafColumns],
  );

  instance.rightHeaderGroups = React.useMemo(
    () => buildHeaderGroups(columns, rightLeafColumns, { instance }),
    [columns, instance, rightLeafColumns],
  );

  instance.centerHeaderGroups[0].headers.forEach((header) =>
    recurseHeaderForSpans(header),
  );
  instance.leftHeaderGroups[0].headers.forEach((header) =>
    recurseHeaderForSpans(header),
  );
  instance.rightHeaderGroups[0].headers.forEach((header) =>
    recurseHeaderForSpans(header),
  );

  return headerGroups;
};

const useReduceFooterGroups: UseReduceFooterGroups = (
  headerGroups,
  { instance },
) => {
  const { centerHeaderGroups, leftHeaderGroups, rightHeaderGroups } = instance;

  instance.centerHeaderGroups = React.useMemo(
    () => [...centerHeaderGroups].reverse(),
    [centerHeaderGroups],
  );

  instance.leftHeaderGroups = React.useMemo(
    () => [...leftHeaderGroups].reverse(),
    [leftHeaderGroups],
  );

  instance.rightHeaderGroups = React.useMemo(
    () => [...rightHeaderGroups].reverse(),
    [rightHeaderGroups],
  );

  return headerGroups;
};

const useReduceFlatHeaders: UseReduceFlatHeaders = (_, { instance }) => {
  const { centerHeaderGroups, leftHeaderGroups, rightHeaderGroups } = instance;

  return flattenBy(
    [...centerHeaderGroups, ...leftHeaderGroups, ...rightHeaderGroups],
    'headers',
    true,
  );
};

export const withColumnPinning = {
  name,
  after: [withColumnVisibility, withColumnOrder],
  plugs: {
    useReduceOptions,
    useInstanceAfterState,
    decorateColumn,
    useReduceLeafColumns,
    useReduceHeaderGroups,
    useReduceFooterGroups,
    useReduceFlatHeaders,
  },
};

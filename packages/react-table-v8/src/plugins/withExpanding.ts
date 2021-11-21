import React, { MouseEvent, TouchEvent } from 'react';

import {
  findExpandedDepth,
  expandRows,
  useMountedLayoutEffect,
  makeStateUpdater,
} from '../utils';

import {
  withExpanding as name,
  withColumnVisibility,
  withColumnFilters,
  withGlobalFilter,
  withGrouping,
  withSorting,
} from '../Constants';
import {
  DecorateRow,
  Expanded,
  TableColumn,
  UseInstanceAfterDataModel,
  UseInstanceAfterState,
  UseReduceLeafColumns,
  UseReduceOptions,
} from '../types';

const useReduceOptions: UseReduceOptions = (options) => {
  return {
    onExpandedChange: React.useCallback(makeStateUpdater('expanded'), []),
    manualExpandedKey: 'expanded',
    manualExpanding: false,
    expandSubRows: true,
    paginateExpandedRows: true,
    ...options,
    initialState: {
      expanded: {},
      ...options.initialState,
    },
  };
};

const useInstanceAfterState: UseInstanceAfterState = (instance) => {
  instance.setExpanded = React.useCallback(
    (updater) => instance.options.onExpandedChange?.(updater, instance),
    [instance],
  );

  const expandedResetDeps = [instance.options.data];

  React.useMemo(() => {
    if (instance.options.autoResetExpanded) {
      instance.state.expanded = instance.options.initialState?.expanded ?? {};
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, expandedResetDeps);

  useMountedLayoutEffect(() => {
    if (instance.options.autoResetExpanded) {
      instance.resetExpanded();
    }
  }, expandedResetDeps);

  instance.getIsAllRowsExpanded = React.useCallback(() => {
    let isAllRowsExpanded = Boolean(
      Object.keys(instance.rowsById).length &&
        Object.keys(instance.state?.expanded ?? {}).length,
    );

    if (isAllRowsExpanded) {
      if (
        Object.keys(instance.rowsById).some(
          (id) => !instance.state.expanded?.[id],
        )
      ) {
        isAllRowsExpanded = false;
      }
    }

    return isAllRowsExpanded;
  }, [instance.rowsById, instance.state.expanded]);

  instance.getExpandedDepth = React.useCallback(
    () => findExpandedDepth(instance.state.expanded ?? {}),
    [instance.state.expanded],
  );

  instance.toggleRowExpanded = React.useCallback(
    (id, value) => {
      if (!id) return;

      instance.setExpanded((old = {}) => {
        const exists = old?.[id];

        value = value ?? !exists;

        if (!exists && value) {
          return {
            ...old,
            [id]: true,
          };
        } else if (exists && !value) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = old;
          return rest;
        } else {
          return old;
        }
      });
    },
    [instance],
  );

  instance.toggleAllRowsExpanded = React.useCallback(
    (value) => {
      const { getIsAllRowsExpanded, rowsById } = instance;

      if (value ?? !getIsAllRowsExpanded()) {
        const expanded: Expanded = {};

        Object.keys(rowsById).forEach((rowId) => {
          expanded[rowId] = true;
        });

        instance.setExpanded(expanded);
      }
      instance.setExpanded({});
    },
    [instance],
  );

  instance.resetExpanded = React.useCallback(
    () => instance.setExpanded(instance.options.initialState?.expanded ?? {}),
    [instance],
  );

  instance.getToggleAllRowsExpandedProps = (props = {}) => ({
    title: 'Toggle All Rows Expanded',
    onClick: () => {
      instance.toggleAllRowsExpanded();
    },
    ...props,
  });

  return instance;
};

const useInstanceAfterDataModel: UseInstanceAfterDataModel = (instance) => {
  const {
    rows,
    state: { expanded },
    options: { paginateExpandedRows },
  } = instance;

  const expandedRows = React.useMemo(() => {
    if (expanded) {
      // This is here to trigger the change detection
    }
    if (paginateExpandedRows) {
      if (process.env.NODE_ENV !== 'production' && instance.options.debug)
        console.info('Expanding...');
      return expandRows(rows, instance);
    }
    return rows;
  }, [expanded, instance, paginateExpandedRows, rows]);

  Object.assign(instance, {
    preExpandedRows: rows,
    expandedRows,
    rows: expandedRows,
  });

  return instance;
};

const useReduceLeafColumns: UseReduceLeafColumns = (
  orderedColumns,
  { instance },
) => {
  const grouping = instance.state.grouping || [];

  return React.useMemo(() => {
    if (grouping.length) {
      return [
        orderedColumns.find((d) => d.isExpanderColumn),
        ...orderedColumns.filter((d) => d && !d.isExpanderColumn),
      ].filter(Boolean) as TableColumn[];
    }
    return orderedColumns;
  }, [grouping.length, orderedColumns]);
};

const decorateRow: DecorateRow = (row, { instance }) => {
  row.toggleExpanded = (set) => instance.toggleRowExpanded(row.id, set);

  row.getIsExpanded = () =>
    instance.options.manualExpanding
      ? row.original[instance.options.manualExpandedKey as string]
      : instance.state.expanded?.[row.id];

  row.getCanExpand = () => row.subRows && !!row.subRows.length;

  row.getToggleExpandedProps = (props = {}) => ({
    onClick: (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      row.toggleExpanded?.();
    },
    title: 'Toggle Row Expanded',
    ...props,
  });

  return row;
};

export const withExpanding = {
  name,
  after: [
    withColumnVisibility,
    withColumnFilters,
    withGlobalFilter,
    withGrouping,
    withSorting,
  ],
  plugs: {
    useReduceOptions,
    useInstanceAfterState,
    useInstanceAfterDataModel,
    useReduceLeafColumns,
    decorateRow,
  },
};

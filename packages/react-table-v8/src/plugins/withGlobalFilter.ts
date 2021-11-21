import React from 'react';

import {
  getFilterMethod,
  functionalUpdate,
  shouldAutoRemoveFilter,
  useMountedLayoutEffect,
  makeStateUpdater,
} from '../utils';

import {
  withGlobalFilter as name,
  withColumnVisibility,
  withColumnFilters,
} from '../Constants';

import * as filterTypes from '../filterTypes';
import {
  Row,
  RowId,
  UseInstanceAfterDataModel,
  UseInstanceAfterState,
  UseReduceOptions,
} from '../types';

const useReduceOptions: UseReduceOptions = (options) => {
  return {
    onGlobalFilterChange: React.useCallback(
      makeStateUpdater('globalFilter'),
      [],
    ),
    autoResetGlobalFilter: true,
    globalFilterType: 'text',
    enableFilters: true,
    filterFromChildrenUp: true,
    ...options,
    initialState: {
      globalFilter: null,
      ...options.initialState,
    },
  };
};

const useInstanceAfterState: UseInstanceAfterState = (instance) => {
  instance.setGlobalFilter = React.useCallback(
    (updater) =>
      instance.options.onGlobalFilterChange?.((old: unknown) => {
        const filterMethod = getFilterMethod(
          instance.options.globalFilterType,
          instance.options.filterTypes || {},
          filterTypes,
        );

        const newFilter = functionalUpdate(updater, old);

        //
        if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter)) {
          return undefined;
        }

        return newFilter;
      }, instance),
    [instance],
  );

  const globalFilterResetDeps = [
    instance.options.manualGlobalFilter ? null : instance.options.data,
  ];

  React.useMemo(() => {
    if (instance.options.autoResetGlobalFilter) {
      instance.state.globalFilter = instance.options.initialState?.globalFilter;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, globalFilterResetDeps);

  useMountedLayoutEffect(() => {
    if (instance.options.autoResetGlobalFilter) {
      instance.resetGlobalFilter?.();
    }
  }, globalFilterResetDeps);

  instance.resetGlobalFilter = React.useCallback(
    () =>
      instance.setGlobalFilter?.(instance.options.initialState?.globalFilter),
    [instance],
  );

  instance.getCanGlobalFilterColumn = React.useCallback(
    (columnId) => {
      const column = instance.leafColumns.find((d) => d.id === columnId);

      if (!column) {
        return false;
      }

      return (
        (instance.options.disableFilters ? false : undefined) ??
        (instance.options.disableGlobalFilter ? false : undefined) ??
        (column.disableAllFilters ? false : undefined) ??
        (column.disableGlobalFilter ? false : undefined) ??
        column.defaultCanFilter ??
        column.defaultCanGlobalFilter ??
        !!column.accessor
      );
    },
    [
      instance.leafColumns,
      instance.options.disableFilters,
      instance.options.disableGlobalFilter,
    ],
  );

  return instance;
};

const useInstanceAfterDataModel: UseInstanceAfterDataModel = (instance) => {
  const {
    options: { manualGlobalFilter, globalFilterType },
    state: { globalFilter },
    rows,
    flatRows,
    rowsById,
    leafColumns,
  } = instance;

  const [globalFilteredRows, globalFilteredFlatRows, globalFilteredRowsById] =
    React.useMemo(() => {
      if (manualGlobalFilter || !globalFilter) {
        return [rows, flatRows, rowsById];
      }

      if (process.env.NODE_ENV !== 'production' && instance.options.debug)
        console.info('Global Filtering...');

      const filteredFlatRows: Row[] = [];
      const filteredRowsById: Record<RowId, Row> = {};

      const filterMethod = getFilterMethod(
        globalFilterType,
        instance.options.filterTypes || {},
        filterTypes,
      );

      if (!filterMethod) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Could not find a valid 'globalFilterType' option.`);
        }
        return [rows, flatRows, rowsById];
      }

      const filterableColumns = leafColumns.filter((c) =>
        instance.getCanGlobalFilterColumn?.(c.id),
      );

      // Filters top level and nested rows
      const filterRows = (filteredRows: Row[]) => {
        filteredRows = filterMethod(
          filteredRows,
          filterableColumns.map((d) => d.id),
          globalFilter,
        );

        filteredRows.forEach((row) => {
          filteredFlatRows.push(row);
          filteredRowsById[row.id] = row;

          row.subRows =
            row.subRows && row.subRows.length
              ? filterRows(row.subRows)
              : row.subRows;
        });

        return filteredRows;
      };

      return [filterRows(rows), filteredFlatRows, filteredRowsById];
    }, [
      manualGlobalFilter,
      globalFilter,
      instance,
      globalFilterType,
      leafColumns,
      rows,
      flatRows,
      rowsById,
    ]);

  Object.assign(instance, {
    preGlobalFilteredRows: rows,
    preGlobalFilteredFlatRows: flatRows,
    preGlobalFilteredRowsById: rowsById,
    globalFilteredRows,
    globalFilteredFlatRows,
    globalFilteredRowsById,
    rows: globalFilteredRows,
    flatRows: globalFilteredFlatRows,
    rowsById: globalFilteredRowsById,
  });

  return instance;
};

export const withGlobalFilter = {
  name,
  after: [withColumnVisibility, withColumnFilters],
  plugs: {
    useReduceOptions,
    useInstanceAfterState,
    useInstanceAfterDataModel,
  },
};

import React, { MouseEvent, TouchEvent } from 'react';

import {
  flattenBy,
  useMountedLayoutEffect,
  makeRenderer,
  makeStateUpdater,
} from '../utils';

import {
  withGrouping as name,
  withColumnVisibility,
  withColumnFilters,
  withGlobalFilter,
} from '../Constants';

import * as _aggregationTypes from '../aggregationTypes';
import {
  AggregationFn,
  Cell,
  ColumnId,
  DecorateCell,
  DecorateColumn,
  Row,
  RowId,
  UseInstanceAfterDataModel,
  UseInstanceAfterState,
  UseReduceLeafColumns,
  UseReduceOptions,
  TableColumn,
  DecorateRow,
} from '../types';

const aggregationTypes: Record<string, AggregationFn> = _aggregationTypes;
const emptyArray: [] = [];
const emptyObject = {};

const useReduceOptions: UseReduceOptions = (options) => {
  return {
    onGroupingChange: React.useCallback(makeStateUpdater('grouping'), []),
    manualGrouping: false,
    autoResetGrouping: true,
    ...options,
    initialState: {
      grouping: [],
      ...options.initialState,
    },
  };
};

const useInstanceAfterState: UseInstanceAfterState = (instance) => {
  instance.setGrouping = React.useCallback(
    (updater) => instance.options.onGroupingChange?.(updater, instance),
    [instance],
  );

  const groupingResetDeps = [
    instance.options.manualGrouping ? null : instance.options.data,
  ];
  React.useMemo(() => {
    if (instance.options.autoResetGrouping) {
      instance.state.grouping = instance.options.initialState?.grouping;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, groupingResetDeps);

  useMountedLayoutEffect(() => {
    if (instance.options.autoResetGrouping) {
      instance.resetGrouping();
    }
  }, groupingResetDeps);

  instance.toggleColumnGrouping = React.useCallback(
    (columnId, value) => {
      instance.setGrouping((old = []) => {
        value = typeof value !== 'undefined' ? value : !old.includes(columnId);

        if (value) {
          return [...old, columnId];
        }

        return old.filter((d) => d !== columnId);
      });
    },
    [instance],
  );

  instance.resetGrouping = React.useCallback(
    () => instance.setGrouping(instance.options.initialState?.grouping ?? []),
    [instance],
  );

  instance.getColumnCanGroup = React.useCallback(
    (columnId) => {
      const column = instance.leafColumns.find((d) => d.id === columnId);

      if (!column) {
        return false;
      }

      return (
        (instance.options.disableGrouping ? false : undefined) ??
        (column.disableGrouping ? false : undefined) ??
        column.defaultCanGroup ??
        !!column.accessor
      );
    },
    [instance.leafColumns, instance.options.disableGrouping],
  );

  instance.getColumnIsGrouped = React.useCallback(
    (columnId) => instance.state.grouping?.includes(columnId) ?? false,
    [instance.state.grouping],
  );

  instance.getColumnGroupedIndex = React.useCallback(
    (columnId) => instance.state.grouping?.indexOf(columnId) ?? -1,
    [instance.state.grouping],
  );

  return instance;
};

const useInstanceAfterDataModel: UseInstanceAfterDataModel = (instance) => {
  const {
    options: { manualGrouping },
    state: { grouping = [] },
    leafColumns,
    rows,
    flatRows,
    rowsById,
  } = instance;

  const [
    groupedRows,
    groupedFlatRows,
    groupedRowsById,
    onlyGroupedFlatRows,
    onlyGroupedRowsById,
    nonGroupedFlatRows,
    nonGroupedRowsById,
  ] = React.useMemo(() => {
    if (manualGrouping || !grouping.length) {
      return [
        rows,
        flatRows,
        rowsById,
        emptyArray,
        emptyObject,
        flatRows,
        rowsById,
      ];
    }

    if (process.env.NODE_ENV !== 'production' && instance.options.debug)
      console.info('Grouping...');

    // Ensure that the list of filtered columns exist
    const existingGrouping = grouping.filter((g) =>
      leafColumns.find((col) => col.id === g),
    );

    // Find the columns that can or are aggregating
    // Uses each column to aggregate rows into a single value
    const aggregateRowsToValues = (
      leafRows: Row[],
      groupedRows: Row[],
      depth: number,
    ) => {
      const values: Record<ColumnId, unknown> = {};

      leafColumns.forEach((column) => {
        // Don't aggregate columns that are in the grouping
        if (existingGrouping.includes(column.id)) {
          values[column.id] = groupedRows[0]
            ? groupedRows[0].values[column.id]
            : null;
          return;
        }

        // Aggregate the values
        const aggregateFn: AggregationFn =
          typeof column.aggregate === 'function'
            ? column.aggregate
            : instance.options.aggregationTypes[column.aggregate ?? ''] ??
              aggregationTypes[column.aggregate ?? ''];

        if (aggregateFn) {
          // Get the columnValues to aggregate
          const groupedValues = groupedRows.map((row) => row.values[column.id]);

          // Get the columnValues to aggregate
          const leafValues = leafRows.map((row) => {
            let columnValue = row.values[column.id];

            if (!depth && column.aggregateValue) {
              columnValue = column.aggregateValue(columnValue, row, column);
            }

            return columnValue;
          });

          values[column.id] = aggregateFn(leafValues, groupedValues);
        } else if (column.aggregate) {
          console.info({ column });
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? `React Table: Invalid column.aggregate option for column listed above`
              : '',
          );
        } else {
          values[column.id] = null;
        }
      });

      return values;
    };

    const groupedFlatRows: Row[] = [];
    const groupedRowsById: Record<RowId, Row> = {};
    const onlyGroupedFlatRows: Row[] = [];
    const onlyGroupedRowsById: Record<RowId, Row> = {};
    const nonGroupedFlatRows: Row[] = [];
    const nonGroupedRowsById: Record<RowId, Row> = {};

    // Recursively group the data
    const groupUpRecursively = (rows: Row[], depth = 0, parentId: RowId) => {
      // This is the last level, just return the rows
      if (depth === existingGrouping.length) {
        return rows;
      }

      const columnId = existingGrouping[depth];

      // Group the rows together for this level
      const rowGroupsMap = groupBy(rows, columnId);

      // Peform aggregations for each group
      const aggregatedGroupedRows = Array.from(rowGroupsMap.entries()).map(
        ([groupingVal, groupedRows], index) => {
          let id = `${columnId}:${groupingVal}`;
          id = parentId ? `${parentId}>${id}` : id;

          // First, Recurse to group sub rows before aggregation
          const subRows = groupUpRecursively(groupedRows, depth + 1, id);

          // Flatten the leaf rows of the rows in this group
          const leafRows = depth
            ? flattenBy<Row[], Row[]>(groupedRows, 'leafRows')
            : groupedRows;

          const values = aggregateRowsToValues(leafRows, groupedRows, depth);

          const row: Row = {
            id,
            groupingId: columnId,
            groupingVal,
            values,
            subRows,
            leafRows,
            depth,
            index,
          };

          subRows.forEach((subRow) => {
            groupedFlatRows.push(subRow);
            groupedRowsById[subRow.id] = subRow;
            if (subRow.getIsGrouped?.()) {
              onlyGroupedFlatRows.push(subRow);
              onlyGroupedRowsById[subRow.id] = subRow;
            } else {
              nonGroupedFlatRows.push(subRow);
              nonGroupedRowsById[subRow.id] = subRow;
            }
          });

          row.cells = [];

          row.cells = leafColumns.map((column) => {
            const value = row.values[column.id];

            const cell: Cell = {
              id: column.id,
              row,
              column,
              value,
            };

            cell.render = makeRenderer(instance, {
              cell,
              row,
              column,
              value,
            });

            instance.plugs.decorateCell?.(cell, { instance });

            return cell;
          });

          row.getVisibleCells = () =>
            instance.leafColumns.map((column) =>
              row.cells?.find((cell) => cell.column.id === column.id),
            ) as Cell[];

          instance.plugs.decorateRow?.(row, { instance });

          return row;
        },
      );

      return aggregatedGroupedRows;
    };

    const groupedRows = groupUpRecursively(rows, 0, '');

    groupedRows.forEach((subRow) => {
      groupedFlatRows.push(subRow);
      groupedRowsById[subRow.id] = subRow;
      if (subRow.getIsGrouped?.()) {
        onlyGroupedFlatRows.push(subRow);
        onlyGroupedRowsById[subRow.id] = subRow;
      } else {
        nonGroupedFlatRows.push(subRow);
        nonGroupedRowsById[subRow.id] = subRow;
      }
    });

    // Assign the new data
    return [
      groupedRows,
      groupedFlatRows,
      groupedRowsById,
      onlyGroupedFlatRows,
      onlyGroupedRowsById,
      nonGroupedFlatRows,
      nonGroupedRowsById,
    ];
  }, [
    manualGrouping,
    grouping,
    instance,
    rows,
    flatRows,
    rowsById,
    leafColumns,
  ]);

  Object.assign(instance, {
    preGroupedRows: rows,
    preGroupedFlatRow: flatRows,
    preGroupedRowsById: rowsById,
    groupedRows,
    groupedFlatRows,
    groupedRowsById,
    onlyGroupedFlatRows,
    onlyGroupedRowsById,
    nonGroupedFlatRows,
    nonGroupedRowsById,
    rows: groupedRows,
    flatRows: groupedFlatRows,
    rowsById: groupedRowsById,
  });

  return instance;
};

const useReduceLeafColumns: UseReduceLeafColumns = (
  orderedColumns,
  { instance },
) => {
  return React.useMemo(() => {
    const grouping = instance.state.grouping;

    if (!grouping?.length) {
      return orderedColumns;
    }

    const expanderColumn = orderedColumns.find((d) => d.isExpanderColumn);

    const groupingColumns = grouping
      .map((g) => orderedColumns.find((col) => col.id === g))
      .filter(Boolean) as TableColumn[];

    const nonGroupingColumns = orderedColumns.filter(
      (col) => !grouping.includes(col.id),
    );

    if (!expanderColumn) {
      nonGroupingColumns.unshift(...groupingColumns);
    }

    return nonGroupingColumns;
  }, [instance.state.grouping, orderedColumns]);
};

const decorateColumn: DecorateColumn = (column, { instance }) => {
  column.Aggregated = column.Aggregated || column.Cell;

  column.getCanGroup = () => instance.getColumnCanGroup(column.id);
  column.getGroupedIndex = () => instance.getColumnGroupedIndex(column.id);
  column.getIsGrouped = () => instance.getColumnIsGrouped(column.id);
  column.toggleGrouping = (value) =>
    instance.toggleColumnGrouping(column.id, value);
  column.getToggleGroupingProps = (props = {}) => {
    const canGroup = column.getCanGroup?.();

    return {
      onClick: canGroup
        ? (e: MouseEvent | TouchEvent) => {
            e.persist();
            column.toggleGrouping?.();
          }
        : undefined,
      title: 'Toggle Grouping',
      ...props,
    };
  };

  return column;
};

const decorateRow: DecorateRow = (row) => {
  row.getIsGrouped = () => !!row.groupingId;

  return row;
};

const decorateCell: DecorateCell = (cell) => {
  // Grouped cells are in the grouping and the pivot cell for the row
  cell.getIsGrouped = () =>
    (cell.column.getIsGrouped?.() && cell.column.id === cell.row.groupingId) ??
    false;
  // Placeholder cells are any columns in the grouping that are not grouped
  cell.getIsPlaceholder = () =>
    (!cell.getIsGrouped?.() && cell.column.getIsGrouped?.()) ?? false;
  // Aggregated cells are not grouped, not repeated, but still have subRows
  cell.getIsAggregated = () =>
    (!cell.getIsGrouped?.() &&
      !cell.getIsPlaceholder?.() &&
      cell.row.getCanExpand?.()) ??
    false;

  return cell;
};

function groupBy(rows: Row[], columnId: ColumnId) {
  const groupMap = new Map<any, Row[]>();

  return rows.reduce((map, row) => {
    const resKey = `${row.values[columnId]}`;
    const previous = map.get(resKey);
    if (!previous) {
      map.set(resKey, [row]);
    } else {
      map.set(resKey, [...previous, row]);
    }
    return map;
  }, groupMap);
}

export const withGrouping = {
  name,
  after: [withColumnVisibility, withColumnFilters, withGlobalFilter],
  plugs: {
    useReduceOptions,
    useInstanceAfterState,
    useInstanceAfterDataModel,
    useReduceLeafColumns,
    decorateColumn,
    decorateRow,
    decorateCell,
  },
};

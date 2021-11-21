import React, { MouseEvent, TouchEvent } from 'react';

import { makeStateUpdater } from '../utils';

import { withColumnVisibility as name } from '../Constants';
import {
  DecorateColumn,
  UseInstanceAfterDataModel,
  UseInstanceAfterState,
  UseReduceLeafColumns,
  UseReduceOptions,
} from '../types';

// {
//   defaultIsVisible: boolean
// }

const useReduceOptions: UseReduceOptions = (options) => {
  return {
    onColumnVisibilityChange: React.useCallback(
      makeStateUpdater('columnVisibility'),
      [],
    ),
    ...options,
    defaultColumn: {
      defaultIsVisible: true,
      ...options.defaultColumn,
    },
    initialState: {
      columnVisibility: {},
      ...options.initialState,
    },
  };
};

const useInstanceAfterState: UseInstanceAfterState = (instance) => {
  instance.setColumnVisibility = React.useCallback(
    (updater) => instance.options.onColumnVisibilityChange?.(updater, instance),
    [instance],
  );

  instance.toggleColumnVisibility = React.useCallback(
    (columnId, value) => {
      if (!columnId) return;

      if (instance.getColumnCanHide(columnId)) {
        instance.setColumnVisibility((old) => ({
          ...old,
          [columnId]: value ?? !instance.getColumnIsVisible(columnId),
        }));
      }
    },
    [instance],
  );

  instance.toggleAllColumnsVisible = React.useCallback(
    (value) => {
      value = value ?? !instance.getIsAllColumnsVisible();

      instance.setColumnVisibility(
        instance.preVisibleLeafColumns.reduce(
          (obj, column) => ({
            ...obj,
            [column.id]: !value ? !column.getCanHide?.() : value,
          }),
          {},
        ),
      );
    },
    [instance],
  );

  instance.getColumnIsVisible = React.useCallback(
    (columnId) => {
      const column = instance.allColumns.find((d) => d.id === columnId);

      if (!column) {
        return true;
      }

      return (
        instance.state.columnVisibility?.[columnId] ??
        column.defaultIsVisible ??
        true
      );
    },
    [instance.allColumns, instance.state.columnVisibility],
  );

  instance.getColumnCanHide = React.useCallback(
    (columnId) => {
      const column = instance.allColumns.find((d) => d.id === columnId);

      if (!column) {
        return false;
      }

      return (
        (instance.options.disableHiding ? false : undefined) ??
        (column.disableHiding ? false : undefined) ??
        column.defaultCanHide ??
        true
      );
    },
    [instance.allColumns, instance.options.disableHiding],
  );

  instance.getIsAllColumnsVisible = React.useCallback(
    () =>
      !instance.preVisibleLeafColumns.some(
        (column) => !column.getIsVisible?.(),
      ),
    [instance.preVisibleLeafColumns],
  );

  instance.getIsSomeColumnsVisible = React.useCallback(
    () =>
      instance.preVisibleLeafColumns.some((column) => column.getIsVisible?.()),
    [instance.preVisibleLeafColumns],
  );

  return instance;
};

const useInstanceAfterDataModel: UseInstanceAfterDataModel = (instance) => {
  instance.getToggleAllColumnsVisibilityProps = React.useCallback(
    (props = {}) => {
      return {
        onChange: (e: MouseEvent) => {
          instance.toggleAllColumnsVisible(
            (e.target as HTMLInputElement)?.checked,
          );
        },
        title: 'Toggle visibility for all columns',
        checked: instance.getIsAllColumnsVisible(),
        indeterminate:
          !instance.getIsAllColumnsVisible() &&
          instance.getIsSomeColumnsVisible(),
        ...props,
      };
    },
    [instance],
  );

  return instance;
};

const decorateColumn: DecorateColumn = (column, { instance }) => {
  column.getCanHide = () => instance.getColumnCanHide(column.id);
  column.getIsVisible = () => instance.getColumnIsVisible(column.id);
  column.toggleVisibility = (value) =>
    instance.toggleColumnVisibility(column.id, value);

  column.getToggleVisibilityProps = (props = {}) => ({
    type: 'checkbox',
    onChange: (e: MouseEvent | TouchEvent) => {
      column.toggleVisibility?.((e.target as HTMLInputElement).checked);
    },
    checked: column.getIsVisible?.(),
    title: 'Toggle Column Visibility',
    ...props,
  });

  return column;
};

const useReduceLeafColumns: UseReduceLeafColumns = (
  leafColumns,
  { instance },
) => {
  const { getColumnIsVisible } = instance;

  instance.preVisibleLeafColumns = React.useMemo(
    () => leafColumns.filter((column) => column.getCanHide?.()),
    [leafColumns],
  );

  return React.useMemo(() => {
    return leafColumns.filter((column) => getColumnIsVisible(column.id));
  }, [getColumnIsVisible, leafColumns]);
};

export const withColumnVisibility = {
  name,
  after: [],
  plugs: {
    useReduceOptions,
    useInstanceAfterState,
    useInstanceAfterDataModel,
    decorateColumn,
    useReduceLeafColumns,
  },
};

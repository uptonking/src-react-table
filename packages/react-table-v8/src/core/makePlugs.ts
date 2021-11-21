import {
  Plugin,
  PlugType,
  PluginPlugs,
  UseReduceOptions,
  UseInstanceAfterState,
  UseInstanceAfterDataModel,
  // UseReduceColumns,
  // UseReduceAllColumns,
  // UseReduceLeafColumns,
  // DecorateColumn,
  // UseReduceHeaderGroups,
  // UseReduceFooterGroups,
  // UseReduceFlatHeaders,
  // DecorateHeader,
  // DecorateRow,
  // DecorateCell,
  ReduceTableProps,
  ReduceTableBodyProps,
  TableOptions,
  TableInstance,
  TableBodyProps,
  ReduceTableHeadProps,
  ReduceTableFooterProps,
  // ReduceHeaderGroupProps,
  // ReduceFooterGroupProps,
  // ReduceHeaderProps,
  // ReduceRowProps,
  // ReduceCellProps,
} from '../types';

import { composeReducer } from '../utils';

const plugTypes: PlugType[] = [
  ['useReduceOptions', composeReducer],
  ['useInstanceAfterState', composeReducer],
  ['useInstanceAfterDataModel', composeReducer],
  // ['useReduceColumns', composeReducer],
  // ['useReduceAllColumns', composeReducer],
  // ['useReduceLeafColumns', composeReducer],
  // ['decorateColumn', composeReducer],
  // ['useReduceHeaderGroups', composeReducer],
  // ['useReduceFooterGroups', composeReducer],
  // ['useReduceFlatHeaders', composeReducer],
  ['decorateHeader', composeReducer],
  // ['decorateRow', composeReducer],
  // ['decorateCell', composeReducer],
  ['reduceTableProps', composeReducer],
  ['reduceTableBodyProps', composeReducer],
  ['reduceTableHeadProps', composeReducer],
  ['reduceTableFooterProps', composeReducer],
  // ['reduceHeaderGroupProps', composeReducer],
  // ['reduceFooterGroupProps', composeReducer],
  ['reduceHeaderProps', composeReducer],
  ['reduceFooterProps', composeReducer],
  // ['reduceRowProps', composeReducer],
  // ['reduceCellProps', composeReducer],
];

const identity = <T>(d: T) => d;

export const defaultPlugs = {
  useReduceOptions: identity as PluginPlugs['useReduceOptions'],
  useInstanceAfterState: identity as PluginPlugs['useInstanceAfterState'],
  useInstanceAfterDataModel:
    identity as PluginPlugs['useInstanceAfterDataModel'],
  // useReduceColumns: identity as PluginPlugs['useReduceColumns'],
  // useReduceAllColumns: identity as PluginPlugs['useReduceAllColumns'],
  // useReduceLeafColumns: identity as PluginPlugs['useReduceLeafColumns'],
  // decorateColumn: identity as PluginPlugs['decorateColumn'],
  // useReduceHeaderGroups: identity as PluginPlugs['useReduceHeaderGroups'],
  // useReduceFooterGroups: identity as PluginPlugs['useReduceFooterGroups'],
  // useReduceFlatHeaders: identity as PluginPlugs['useReduceFlatHeaders'],
  decorateHeader: identity as PluginPlugs['decorateHeader'],
  // decorateRow: identity as PluginPlugs['decorateRow'],
  // decorateCell: identity as PluginPlugs['decorateCell'],
  reduceTableProps: identity as PluginPlugs['reduceTableProps'],
  reduceTableBodyProps: identity as PluginPlugs['reduceTableBodyProps'],
  reduceTableHeadProps: identity as PluginPlugs['reduceTableHeadProps'],
  reduceTableFooterProps: identity as PluginPlugs['reduceTableFooterProps'],
  // reduceHeaderGroupProps: identity as PluginPlugs['reduceHeaderGroupProps'],
  // reduceFooterGroupProps: identity as PluginPlugs['reduceFooterGroupProps'],
  reduceHeaderProps: identity as PluginPlugs['reduceHeaderProps'],
  reduceFooterProps: identity as PluginPlugs['reduceFooterProps'],
  // reduceRowProps: identity as PluginPlugs['reduceRowProps'],
  // reduceCellProps: identity as PluginPlugs['reduceCellProps'],
};

export default function makePlugs(plugins: Plugin[]) {
  plugins = plugins.filter(Boolean);

  plugins.sort((a, b) => {
    if (a.after.includes(b.name) || a.after.length > b.after.length) {
      return 1;
    }
    if (b.after.includes(a.name) || b.after.length > a.after.length) {
      return -1;
    }
    return 0;
  });

  if (process.env.NODE_ENV !== 'production') {
    plugins.forEach((plugin) => {
      Object.keys(plugin.plugs).forEach((plugName) => {
        if (!plugTypes.find((d) => d[0] === plugName)) {
          throw new Error(
            `Unknown plug "${plugName}" found in plugin "${plugin.name}"`,
          );
        }
      });
    });
  }

  return plugTypes.reduce((plugs, [plugType, plugCompositionFn]) => {
    const pluginPlugs = plugins
      .map((plugin) => plugin.plugs[plugType])
      .filter(Boolean);

    plugs[plugType] = plugCompositionFn(pluginPlugs);

    return plugs;
  }, {} as PluginPlugs);
}

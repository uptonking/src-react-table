import React from 'react';

//

import makePlugs from './makePlugs';
import useTableState from './useTableState';
import useColumns from './useColumns';
import useHeadersAndFooters from './useHeadersAndFooters';
import useDataModel from './useDataModel';
import {
  TableInstance,
  Plugin,
  TableOptions,
  TableBodyProps,
  HeaderProps,
  IntersectionIdentity,
  FooterProps,
} from '../types';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type ExtractReturnTypeFromPlugins<
  TBase,
  TPlugins extends Plugin[],
  TPlug extends keyof Plugin['plugs'],
> = IntersectionIdentity<
  UnionToIntersection<
    TBase | UnionToIntersection<ReturnType<TPlugins[number]['plugs'][TPlug]>>
  >
>;

// type ExtractTableInstanceFromPlugins<
//   TPlugins extends Plugin[] = Plugin[]
// > = UnionToIntersection<
//   ReturnType<
//     TPlugins[number]['plugs']['useInstanceAfterState']
//     // | 'useInstanceAfterDataModel'
//   >
// >

// type ExtractTableInstanceFromPlugins<
//   TPlugins extends Plugin[] = Plugin[]
// > = UnionToIntersection<
//   ReturnType<
//     TPlugins[number]['plugs']['useInstanceAfterState']
//     // | 'useInstanceAfterDataModel'
//   >
// >

export function useTable<
  TOptions extends ExtractReturnTypeFromPlugins<
    TableOptions,
    TPlugins,
    'useReduceOptions'
  >,
  TTableBodyProps extends ExtractReturnTypeFromPlugins<
    TableBodyProps,
    TPlugins,
    'reduceTableBodyProps'
  >,
  THeaderProps extends ExtractReturnTypeFromPlugins<
    HeaderProps,
    TPlugins,
    'reduceHeaderProps'
  >,
  TFooterProps extends ExtractReturnTypeFromPlugins<
    FooterProps,
    TPlugins,
    'reduceFooterProps'
  >,
  TTableInstance extends ExtractReturnTypeFromPlugins<
    TableInstance<TOptions, TTableBodyProps, THeaderProps, TFooterProps>,
    TPlugins,
    'useInstanceAfterState'
  >,
  TPlugins extends Plugin[],
>(
  options: TOptions,
  plugins?: TPlugins,
  // Plugins affect both options and returned instance via many different plugs
  // Each Plug that can affect the instance will need to be iterated
  // and merged into the final instance type
) {
  // ExtractTableInstanceFromPlugins<TPlugins>

  const instanceRef = React.useRef<TTableInstance>();

  // Create and keep track of the table instance
  if (!instanceRef.current) {
    instanceRef.current = {
      plugs: makePlugs(plugins || []),
    } as TTableInstance;
  }

  const instance = instanceRef.current;

  // Apply the defaults to our options
  instance.options = instance.plugs.useReduceOptions(options, {
    instance,
  }) as TOptions;

  useTableState(instance);

  instance.plugs.useInstanceAfterState(instance);

  useColumns(instance);
  useHeadersAndFooters(instance);
  useDataModel(instance);

  instance.plugs.useInstanceAfterDataModel(instance);

  instance.getTableProps = (props) =>
    instance.plugs.reduceTableProps(props ?? {}, { instance });

  instance.getTableHeadProps = (props) =>
    instance.plugs.reduceTableHeadProps(props ?? {}, { instance });

  instance.getTableFooterProps = (props) =>
    instance.plugs.reduceTableFooterProps(props ?? {}, { instance });

  instance.getTableBodyProps = (props) =>
    instance.plugs.reduceTableBodyProps(props ?? {}, { instance });

  return instance;
}

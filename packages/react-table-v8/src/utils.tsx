import React from 'react';
import {
  TableColumn,
  RendererMeta,
  FilterFn,
  Header,
  Row,
  RowId,
  TableInstance,
  TableState,
  Expanded,
  HeaderGroup,
  ComposeReducer,
} from './types';

export const composeReducer: ComposeReducer = (fns) => {
  return (initial, meta) =>
    fns.reduce((reduced: any, fn: any) => fn(reduced, meta), initial);
};

export type DataUpdateFunction<TInput, TOutput> = (input: TInput) => TOutput;

export type Updater<TInput, TOutput> =
  | TOutput
  | DataUpdateFunction<TInput, TOutput>;

export function functionalUpdate<TInput, TOutput = TInput>(
  updater: Updater<TInput, TOutput>,
  input: TInput,
): TOutput {
  return typeof updater === 'function'
    ? (updater as DataUpdateFunction<TInput, TOutput>)(input)
    : updater;
}

export function noop() {
  //
}

export function makeStateUpdater(key: string) {
  return (updater: any, instance: TableInstance) => {
    instance.setState((old: TableState) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, (old as any)[key]),
      };
    });
  };
}

export function useGetLatest(obj: any) {
  const ref = React.useRef();
  ref.current = obj;

  return React.useCallback(() => ref.current, []);
}

// SSR has issues with useLayoutEffect still, so use useEffect during SSR
export const safeUseLayoutEffect =
  typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export function useMountedLayoutEffect(fn: any, deps: any[]) {
  const mountedRef = React.useRef(false);

  safeUseLayoutEffect(() => {
    if (mountedRef.current) {
      fn();
    }
    mountedRef.current = true;
    // eslint-disable-next-line
  }, deps);
}

export function makeRenderer<T, U extends RendererMeta>(
  instance: T,
  meta: U = {} as U,
) {
  return (Comp: unknown, userProps: {}) => {
    return flexRender(Comp, {
      instance,
      ...meta,
      ...userProps,
    });
  };
}

export function flexRender(Comp: any, props: any) {
  return isReactComponent(Comp) ? <Comp {...props} /> : Comp;
}

function isReactComponent(component: unknown) {
  return (
    isClassComponent(component) ||
    typeof component === 'function' ||
    isExoticComponent(component)
  );
}

function isClassComponent(component: any) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isReactComponent;
    })()
  );
}

function isExoticComponent(component: any) {
  return (
    typeof component === 'object' &&
    typeof component.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description)
  );
}

export function flattenColumns(
  columns: TableColumn[],
  includeParents: boolean,
) {
  return flattenBy<TableColumn[], TableColumn[]>(
    columns,
    'columns',
    includeParents,
  );
}

export function isFunction(a: any): a is (...any: any[]) => any {
  return typeof a === 'function';
}

export function flattenBy<T extends any[], U>(
  arr: T,
  key: string,
  includeParents?: boolean,
) {
  const flat: any = [];

  const recurse = (subArr: T) => {
    subArr.forEach((item) => {
      if (item[key]?.length) {
        if (includeParents) {
          flat.push(item);
        }
        recurse(item[key]);
      } else {
        flat.push(item);
      }
    });
  };

  recurse(arr);

  return flat as U;
}

export function expandRows(rows: Row[], instance: TableInstance) {
  const expandedRows: Row[] = [];

  const handleRow = (row: Row) => {
    expandedRows.push(row);

    if (
      instance.options.expandSubRows &&
      row.subRows &&
      row.subRows.length &&
      row.getIsExpanded?.()
    ) {
      row.subRows.forEach(handleRow);
    }
  };

  rows.forEach(handleRow);

  return expandedRows;
}

export function getFilterMethod(filter: any, userTypes: any, types: any): any {
  return isFunction(filter)
    ? filter
    : userTypes[filter as string] ?? types[filter as string];
}

export function shouldAutoRemoveFilter(
  autoRemove: FilterFn['autoRemove'],
  value: any,
  column?: TableColumn,
) {
  return autoRemove ? autoRemove(value, column) : typeof value === 'undefined';
}

type BasicSortFn = (a: any, b: any) => number;

export function orderBy<T extends { index: number }>(
  arr: T[],
  funcs: BasicSortFn[],
): T[] {
  const copy = [...arr];
  copy.sort((a, b) => {
    for (let i = 0; i < funcs.length; i += 1) {
      const sortInt = funcs[i](a, b);
      if (sortInt !== 0) {
        return sortInt;
      }
    }

    return b.index - a.index;
  });
  return copy;
}

export function getRowIsSelected(
  row: Row,
  selection: Record<RowId, boolean>,
  manualRowSelectedKey?: string,
) {
  if (
    selection[row.id] ||
    (manualRowSelectedKey && row.original[manualRowSelectedKey])
  ) {
    return true;
  }

  if (row.subRows && row.subRows.length) {
    let allChildrenSelected = true;
    let someSelected = false;

    row.subRows.forEach((subRow: Row) => {
      // Bail out early if we know both of these
      if (someSelected && !allChildrenSelected) {
        return;
      }

      if (getRowIsSelected(subRow, selection, manualRowSelectedKey)) {
        someSelected = true;
      } else {
        allChildrenSelected = false;
      }
    });
    return allChildrenSelected ? true : someSelected ? 'some' : false;
  }

  return false;
}

export function findExpandedDepth(expanded: Expanded) {
  let maxDepth = 0;

  Object.keys(expanded).forEach((id) => {
    const splitId = id.split('.');
    maxDepth = Math.max(maxDepth, splitId.length);
  });

  return maxDepth;
}

export function getLeafHeaders(originalHeader: Header) {
  const leafHeaders: Header[] = [];

  const recurseHeader = (header: Header) => {
    if (header.subHeaders && header.subHeaders.length) {
      header.subHeaders.map(recurseHeader);
    }
    leafHeaders.push(header);
  };

  recurseHeader(originalHeader);
  return leafHeaders;
}

export function useLazyMemo<T extends (...any: any[]) => any>(
  fn: T,
  deps: any[] = [],
) {
  const ref = React.useRef<{ deps: any[]; result: ReturnType<T> }>({
    deps: [],
    result: null as ReturnType<T>,
  });

  return React.useCallback(() => {
    if (
      ref.current.deps.length !== deps.length ||
      deps.some((dep, i) => ref.current.deps[i] !== dep)
    ) {
      ref.current.deps = deps;
      ref.current.result = fn();
    }

    return ref.current.result;
  }, [deps, fn]);
}

export function applyDefaults(obj: any, defaults: any) {
  const newObj = { ...obj };

  Object.keys(defaults).forEach((key) => {
    if (typeof newObj[key] === 'undefined') {
      newObj[key] = defaults[key];
    }
  });

  return newObj;
}

export function buildHeaderGroups(
  originalColumns: TableColumn[],
  leafColumns: TableColumn[],
  { instance }: { instance: TableInstance },
) {
  // Find the max depth of the columns:
  // build the leaf column row
  // build each buffer row going up
  //    placeholder for non-existent level
  //    real column for existing level

  let maxDepth = 0;

  const findMaxDepth = (columns: TableColumn[], depth = 0) => {
    maxDepth = Math.max(maxDepth, depth);

    columns.forEach((column) => {
      if (column.getIsVisible && !column.getIsVisible()) {
        return;
      }
      if (column.columns) {
        findMaxDepth(column.columns, depth + 1);
      }
    }, 0);
  };

  findMaxDepth(originalColumns);

  const headerGroups: HeaderGroup[] = [];

  const makeHeaderGroup = (headers: Header[], depth: number) => {
    // The header group we are creating
    const headerGroup: Partial<HeaderGroup> = {
      depth,
      id: depth,
      headers: [],
    };

    // The parent columns we're going to scan next
    const parentHeaders: Header[] = [];

    // Scan each column for parents
    headers.forEach((header) => {
      // What is the latest (last) parent column?
      const latestParentHeader = [...parentHeaders].reverse()[0];

      const parentHeader: Partial<Header> = {
        subHeaders: [],
      };

      const isTrueHeaderDepth = header.column.depth === headerGroup.depth;

      if (isTrueHeaderDepth && header.column.parent) {
        // The parent header different
        parentHeader.isPlaceholder = false;
        parentHeader.column = header.column.parent;
      } else {
        // The parent header is repeated
        parentHeader.column = header.column;
        parentHeader.isPlaceholder = true;
      }

      parentHeader.placeholderId = parentHeaders.filter(
        (d) => d.column === parentHeader.column,
      ).length;

      if (
        !latestParentHeader ||
        latestParentHeader.column !== parentHeader.column
      ) {
        parentHeader.subHeaders!.push(header);
        parentHeaders.push(parentHeader as Header);
      } else {
        latestParentHeader.subHeaders.push(header);
      }

      if (!header.isPlaceholder) {
        header.column.header = header;
      }

      header.id = [header.column.id, header.placeholderId]
        .filter(Boolean)
        .join('_');

      headerGroup.headers?.push(header);
    });

    headerGroups.push(headerGroup as HeaderGroup);

    if (depth > 0) {
      makeHeaderGroup(parentHeaders, depth - 1);
    }
  };

  const bottomHeaders = leafColumns.map((column) => ({
    column,
    isPlaceholder: false,
  }));

  makeHeaderGroup(bottomHeaders as Header[], maxDepth);

  headerGroups.reverse();

  headerGroups.forEach((headerGroup) => {
    headerGroup.getHeaderGroupProps = (props = {}) =>
      instance.plugs.reduceHeaderGroupProps?.(
        {
          key: headerGroup.id,
          role: 'row',
          ...props,
        },
        { instance, headerGroup },
      ) ?? {};

    headerGroup.getFooterGroupProps = (props = {}) =>
      instance.plugs.reduceFooterGroupProps?.(
        {
          key: headerGroup.id,
          role: 'row',
          ...props,
        },
        { instance, headerGroup },
      ) ?? {};
  });

  return headerGroups;
}

export function recurseHeaderForSpans(header: Header) {
  let colSpan = 0;
  let rowSpan = 1;
  let childRowSpans = [0];

  if (header.column.getIsVisible && header.column.getIsVisible()) {
    if (header.subHeaders && header.subHeaders.length) {
      childRowSpans = [];
      header.subHeaders.forEach((subHeader) => {
        const [count, childRowSpan] = recurseHeaderForSpans(subHeader);
        colSpan += count;
        childRowSpans.push(childRowSpan);
      });
    } else {
      colSpan = 1;
    }
  }

  const minChildRowSpan = Math.min(...childRowSpans);
  rowSpan = rowSpan + minChildRowSpan;

  header.colSpan = colSpan;
  header.rowSpan = rowSpan;

  return [colSpan, rowSpan];
}

let passiveSupported: boolean | null = null;

export function passiveEventSupported() {
  // memoize support to avoid adding multiple test events
  if (typeof passiveSupported === 'boolean') return passiveSupported;

  let supported = false;
  try {
    const options = {
      get passive() {
        supported = true;
        return false;
      },
    };

    window.addEventListener('test', noop, options);
    window.removeEventListener('test', noop);
  } catch (err) {
    supported = false;
  }
  passiveSupported = supported;
  return passiveSupported;
}

export interface TableOptions {
  data: unknown[];
  columns: Column[];
  debug?: boolean;
  defaultColumn?: Column;
  initialState?: {};
  state?: {};
  onStateChange?: <TTableInstance>(
    newState: {},
    instance: TTableInstance,
  ) => void;
  getSubRows?: <TOriginalRow>(
    originalRow: TOriginalRow,
    index: number,
  ) => TOriginalRow[];
  getRowId?: <TOriginalRow, TParentRow extends Row>(
    originalRow: TOriginalRow,
    index: number,
    parent?: TParentRow,
  ) => string;

  // // withColumnFilters
  // enableFilters?: boolean
  // filterFromChildrenUp?: boolean
  // onColumnFiltersChange?: (
  //   updater: Updater<TableState['columnFilters']>,
  //   instance: TableInstance
  // ) => void
  // filterTypes?: Record<string, FilterFn>
  // manualColumnFilters?: boolean
  // autoResetColumnFilters?: boolean
  // disableFilters?: boolean
  // disableColumnFilters?: boolean
  // enableFacetedFilters?: boolean
  // enableUniqueValues?: boolean
  // enableMinMaxValues?: boolean

  // // withColumnOrder
  // onColumnOrderChange?: (
  //   updater: Updater<TableState['columnOrder']>,
  //   instance: TableInstance
  // ) => void

  // // withColumnPinning
  // onColumnPinningChange?: (
  //   updater: Updater<TableState['columnPinning']>,
  //   instance: TableInstance
  // ) => void
  // disablePinning: boolean

  // // withColumnResizing
  // onColumnResizingChange?: (
  //   updater: Updater<TableState['columnResizing']>,
  //   instance: TableInstance
  // ) => void
  // disableResizing?: boolean

  // // withColumnVisibility
  // onColumnVisibilityChange?: (
  //   updater: Updater<TableState['columnVisibility']>,
  //   instance: TableInstance
  // ) => void
  // disableHiding?: boolean

  // // withExpanding
  // paginateExpandedRows?: boolean
  // onExpandedChange?: (
  //   updater: Updater<TableState['expanded']>,
  //   instance: TableInstance
  // ) => void
  // autoResetExpanded?: boolean
  // manualExpanding?: boolean
  // manualExpandedKey?: string
  // expandSubRows?: boolean

  // // withGlobalFilter
  // manualGlobalFilter?: boolean
  // autoResetGlobalFilter?: boolean

  // // withGrouping
  // onGroupingChange?: (
  //   updater: Updater<TableState['grouping']>,
  //   instance: TableInstance
  // ) => void
  // manualGrouping?: boolean
  // autoResetGrouping?: boolean
  // disableGrouping?: boolean
  // aggregationTypes: Record<string, AggregationFn>

  // // withGlobalFilter
  // onGlobalFilterChange?: (
  //   updater: Updater<TableState['globalFilter']>,
  //   instance: TableInstance
  // ) => void
  // globalFilterType?: FilterType
  // disableGlobalFilter?: boolean

  // // withPagination
  // paginateExpandedRows?: boolean
  // onPageIndexChange?: (
  //   updater: Updater<TableState['pageIndex']>,
  //   instance: TableInstance
  // ) => void
  // onPageSizeChange?: (
  //   updater: Updater<TableState['pageSize']>,
  //   instance: TableInstance
  // ) => void
  // onPageCountChange?: (
  //   updater: Updater<TableState['pageCount']>,
  //   instance: TableInstance
  // ) => void
  // manualPagination?: boolean
  // autoResetPageIndex?: boolean

  // // withRowSelection
  // onRowSelectionChange?: (
  //   updater: Updater<TableState['rowSelection']>,
  //   instance: TableInstance
  // ) => void
  // autoResetRowSelection?: boolean
  // selectSubRows?: boolean
  // selectGroupingRows?: boolean
  // manualRowSelectedKey?: string
  // isAdditiveSelectEvent?: (e: any) => boolean
  // isInclusiveSelectEvent?: (e: any) => boolean

  // // withSorting
  // onSortingChange?: (
  //   updater: Updater<TableState['sorting']>,
  //   instance: TableInstance
  // ) => void
  // sortTypes?: Record<string, SortFn>
  // manualSorting?: boolean
  // autoResetSorting?: boolean
  // isMultiSortEvent?: (event: any) => boolean
  // disableMultiSort?: boolean
  // disableSortRemove?: boolean
  // disableMultiRemove?: boolean
  // maxMultiSortColCount?: number
  // disableSorting?: boolean
}

export interface TableInstance<
  TOptions extends TableOptions = TableOptions,
  TTableProps extends TableProps = TableProps,
  TTableHeadProps extends TableHeadProps = TableHeadProps,
  TTableBodyProps extends TableBodyProps = TableBodyProps,
  TTableFooterProps extends TableFooterProps = TableFooterProps,
  THeaderProps extends HeaderProps = HeaderProps,
  TFooterProps extends FooterProps = FooterProps,
> {
  options: TOptions;
  plugs: PluginPlugs;
  columns: TableColumn[];
  allColumns: TableColumn[];
  leafColumns: TableColumn[];
  state: TableState;
  setState: (...any: any[]) => any;
  getTableProps: <TUserProps>(
    userProps: TUserProps,
  ) => TUserProps & TTableProps;
  getTableHeadProps: <TUserProps>(
    userProps: TUserProps,
  ) => TUserProps & TTableHeadProps;
  getTableBodyProps: <TUserProps>(
    userProps: TUserProps,
  ) => TUserProps & TTableBodyProps;
  getTableFooterProps: <TUserProps>(
    userProps: TUserProps,
  ) => TUserProps & TTableFooterProps;

  // headerGroups: HeaderGroup[]
  // footerGroups: FooterGroup[]
  flatHeaders: Header<THeaderProps, TFooterProps>[];
  flatFooters: Header<THeaderProps, TFooterProps>[];
  // rows: Row[]
  // flatRows: Row[]
  // rowsById: Record<RowId, Row>

  // // withColumnFilters
  // setColumnFilters: (updater: Updater<TableState['columnFilters']>) => void
  // resetColumnFilters: () => void
  // getColumnCanFilter: (columnId?: ColumnId) => boolean
  // getColumnIsFiltered: (columnId?: ColumnId) => boolean
  // getColumnFilterValue: (columnId?: ColumnId) => any
  // getColumnFilterIndex: (columnId?: ColumnId) => number
  // setColumnFilterValue: (columnId?: ColumnId, value?: unknown) => void

  // // withColumnOrder
  // setColumnOrder: (updater: Updater<TableState['columnOrder']>) => void
  // resetColumnOrder: () => void

  // // withColumnPinning
  // setColumnPinning: (updater: Updater<TableState['columnPinning']>) => void
  // resetColumnPinning: () => void
  // toggleColumnPinning: (
  //   columnId: ColumnId,
  //   side: ColumnPinningSide,
  //   value?: boolean
  // ) => void
  // getColumnCanPin: (columnId: ColumnId) => boolean
  // getColumnIsPinned: (columnId: ColumnId) => ColumnPinningStatus
  // getColumnPinnedIndex: (columnId: ColumnId) => number
  // centerLeafColumns: TableColumn[]
  // leftLeafColumns: TableColumn[]
  // rightLeafColumns: TableColumn[]
  // centerHeaderGroups: HeaderGroup[]
  // leftHeaderGroups: HeaderGroup[]
  // rightHeaderGroups: HeaderGroup[]

  // // withColumnResizing
  // setColumnResizing: (updater: Updater<TableState['columnResizing']>) => void
  // getColumnCanResize: (columnId: ColumnId) => boolean
  // getColumnIsResizing: (columnId: ColumnId) => boolean

  // // withColumnVisibility
  // setColumnVisibility: (
  //   updater: Updater<TableState['columnVisibility']>
  // ) => void
  // getColumnIsVisible: (columnId: ColumnId) => boolean
  // toggleColumnVisibility: (columnId: ColumnId, value?: boolean) => void
  // getColumnCanHide: (columnId: ColumnId) => boolean
  // toggleAllColumnsVisible: (value?: boolean) => void
  // getIsAllColumnsVisible: () => boolean
  // getIsSomeColumnsVisible: () => boolean
  // preVisibleLeafColumns: TableColumn[]
  // getToggleAllColumnsVisibilityProps: (userProps?: {}) => ToggleAllColumnsVisibilityProps

  // // withExpanding
  // setExpanded: (updater: Updater<TableState['expanded']>) => void
  // resetExpanded: () => void
  // getIsAllRowsExpanded: () => boolean
  // getExpandedDepth: () => number
  // toggleRowExpanded: (rowId: RowId, value?: boolean) => void
  // toggleAllRowsExpanded: (value?: boolean) => void
  // getToggleAllRowsExpandedProps: (userProps?: {}) => ToggleAllRowsExpandedProps

  // // withGrouping
  // setGrouping: (updater: Updater<TableState['grouping']>) => void
  // resetGrouping: () => void
  // toggleColumnGrouping: (columnId: ColumnId, value?: boolean) => void
  // getColumnCanGroup: (columnId: ColumnId) => boolean
  // getColumnIsGrouped: (columnId: ColumnId) => boolean
  // getColumnGroupedIndex: (columnId: ColumnId) => number
  // nonGroupedRowsById: Record<RowId, Row>

  // // withGlobalFilter
  // setGlobalFilter?: (updater: Updater<TableState['globalFilter']>) => void
  // resetGlobalFilter?: () => void
  // getCanGlobalFilterColumn?: (columnId: ColumnId) => boolean

  // // withPagination
  // setPageIndex?: (updater: Updater<TableState['pageIndex']>) => void
  // setPageSize?: (updater: Updater<TableState['pageSize']>) => void
  // setPageCount?: (updater: Updater<TableState['pageCount']>) => void
  // resetPageIndex?: () => void
  // resetPageSize?: () => void
  // resetPageCount?: () => void
  // getPageCount?: () => number
  // getPageOptions?: () => number[]
  // getPageRows?: () => Row[]
  // getCanPreviousPage?: () => boolean
  // getCanNextPage?: () => boolean
  // gotoPreviousPage?: () => void
  // gotoNextPage?: () => void

  // // withRowSelection
  // setRowSelection?: (updater: Updater<TableState['rowSelection']>) => void
  // resetRowSelection?: () => void
  // toggleAllRowsSelected?: (value?: boolean) => void
  // toggleAllPageRowsSelected?: (value?: boolean) => void
  // toggleRowSelected?: (rowId: RowId, value?: boolean) => void
  // addRowSelectionRange?: (rowId: RowId) => void
  // getSelectedFlatRows?: () => Row[]
  // getIsAllRowsSelected?: () => boolean
  // getIsAllPageRowsSelected?: () => boolean
  // getIsSomeRowsSelected?: () => false | number
  // getIsSomePageRowsSelected?: () => false | number
  // getToggleAllRowsSelectedProps?: (userProps?: {}) => ToggleAllRowsSelectedProps
  // getToggleAllPageRowsSelectedProps?: (userProps?: {}) => ToggleAllPageRowsSelectedProps

  // // withSorting
  // setSorting: (updater: Updater<TableState['sorting']>) => void
  // resetSorting: () => void
  // toggleColumnSorting: (
  //   columnId?: ColumnId,
  //   desc?: boolean,
  //   multi?: boolean
  // ) => void
  // getColumnCanSort: (columnId?: ColumnId) => boolean
  // getColumnSortedIndex: (columnId?: ColumnId) => number
  // getColumnIsSorted: (columnId?: ColumnId) => boolean
  // getColumnIsSortedDesc: (columnId?: ColumnId) => boolean
  // clearColumnSorting: (columnId?: ColumnId) => void
}

export type ColumnId = string;
export type RowId = string;
export type CellId = string;

export type Updater<T> = T | ((old: T) => T);
export type FromUpdater<T extends (...any: any[]) => any> = T extends (
  old: infer U,
) => any
  ? U
  : T;

export interface TableState {
  columnFilters?: ColumnFilter[];
  columnOrder?: ColumnId[];
  columnPinning?: ColumnPinning;
  columnResizing?: ColumnResizing;
  columnVisibility?: ColumnVisibility;
  expanded?: Expanded;
  grouping?: Grouping;
  globalFilter?: unknown;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  rowSelection?: Record<RowId, boolean>;
  sorting?: SortObj[];
}

export interface Row<T = unknown> {
  id: RowId;
  subRows: Row[];
  index: number;
  depth: number;
  values: RowValues;
  leafRows: Row[];
  getRowProps?: (userProps?: {}) => RowProps;
  original?: T;
  originalSubRows?: T[];
  cells?: Cell[];
  getVisibleCells?: () => Cell[];

  // withExpanding
  toggleExpanded?: (value?: boolean) => void;
  getIsExpanded?: () => boolean;
  getCanExpand?: () => boolean;
  getToggleExpandedProps?: (userProps?: {}) => ToggleExpandedProps;

  // withGrouping
  groupingId?: ColumnId;
  groupingVal?: unknown;
  getIsGrouped?: () => boolean;

  // withRowSelection
  getIsSelected?: () => boolean | 'some';
  getIsSomeSelected?: () => boolean;
  toggleSelected?: (value?: boolean) => void;
  getToggleRowSelectedProps?: (userProps?: {
    forInput?: boolean;
    onClick?: any;
  }) => ToggleExpandedProps;
  getProps?: (userProps?: {}) => ToggleExpandedProps;
}

export interface RowValues {
  [key: string]: unknown;
}

interface ColumnBase {
  id?: ColumnId;
  Header?: Renderer;
  accessor?:
    | string
    | ((originalRow: unknown, index: number, row: Row) => unknown);
  Cell?: Renderer;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  columns?: Column[];
}

interface ColumnWithStringHeader extends ColumnBase {
  Header: string;
}

interface ColumnWithStringAccessor extends ColumnBase {
  accessor: string;
}

interface ColumnWithId extends ColumnBase {
  id: ColumnId;
}

export type Column =
  | ColumnWithStringHeader
  | ColumnWithStringAccessor
  | ColumnWithId;

type Renderer = string | JSX.Element | ((...args: any[]) => JSX.Element);

// export interface ColumnToMigrate {
//   // withColumnFilters
//   filterType?: FilterType
//   disableAllFilters?: boolean
//   disableFilter?: boolean
//   defaultCanFilter?: boolean
//   defaultCanFilterColumn?: boolean

//   // withSorting
//   sortDescFirst?: boolean
//   disableSorting?: boolean
//   defaultCanSort?: boolean
//   sortType?: SortType

//   // withColumnFilters
//   enableUniqueValues?: boolean
//   enableMinMaxValues?: boolean
//   defaultCanPin?: boolean

//   // withColumnResizing
//   disableResizing?: boolean
//   defaultCanResize?: boolean

//   // withColumnVisibility
//   defaultIsVisible: boolean
//   disableHiding?: boolean
//   defaultCanHide?: boolean

//   // withExpanding
//   isExpanderColumn?: boolean

//   // withGrouping
//   disableGrouping?: boolean
//   defaultCanGroup?: boolean
//   aggregate?: AggregationType
//   aggregateValue?: AggregateValueFn
//   Aggregated?: JSX.Element | ((...any: any[]) => JSX.Element)

//   // withGlobalFilter
//   disableGlobalFilter?: boolean
//   defaultCanGlobalFilter?: boolean

//   // withRowSelection
//   isRowSelectionColumn?: boolean

//   // withColumnPinning
//   disablePinning?: boolean
// }

export type TableColumn = Column & {
  id: ColumnId;
  depth: number;
  originalColumn: Column;
  parent: TableColumn;
  prepared: boolean;
  render: (Comp?: unknown, props?: any) => JSX.Element | null;
  getWidth: () => number;
  columns: TableColumn[];
  header: Header;

  // // withSorting
  // sortInverted?: boolean
  // getCanSort?: () => boolean
  // getSortedIndex?: () => number
  // getIsSorted?: () => boolean
  // toggleSorting?: (desc?: boolean, multi?: boolean) => void
  // clearSorting?: () => void
  // getIsSortedDesc?: () => boolean
  // getToggleSortingProps?: (userProps?: {}) => ToggleSortingProps

  // // withColumnFilters
  // getCanFilter?: () => boolean
  // getFilterIndex?: () => number
  // getIsFiltered?: () => boolean
  // getFilterValue?: () => unknown
  // setFilterValue?: (value: unknown) => void
  // preFilteredRows?: Row[]
  // preFilteredUniqueValues?: Map<unknown, number>
  // preFilteredMinMaxValues?: [MinMaxValue, MinMaxValue]

  // // withColumnResizing
  // getIsResizing?: () => boolean
  // getCanResize?: () => boolean
  // getResizerProps?: (userProps?: {}) => ResizerProps

  // // withColumnVisibility
  // getIsVisible?: () => boolean
  // getCanHide?: () => boolean
  // toggleVisibility?: (value?: boolean) => void
  // getToggleVisibilityProps?: (userProps?: {}) => ToggleColumnVisibilityProps

  // // withGrouping
  // getCanGroup?: () => boolean
  // getGroupedIndex?: () => number
  // getIsGrouped?: () => boolean
  // toggleGrouping?: (value?: boolean) => void
  // getToggleGroupingProps?: (userProps?: {}) => ToggleGroupingProps

  // // withColumnPinning
  // getCanPin?: () => boolean
  // getPinnedIndex?: () => number
  // getIsPinned?: () => ColumnPinningStatus
  // togglePinning?: (side: ColumnPinningSide, value?: boolean) => void
};

// type MinMaxValue = number | string

export interface Cell {
  id: CellId;
  row: Row;
  column: TableColumn;
  value: unknown;
  render?: (Comp?: unknown, props?: any) => JSX.Element | null;
  getCellProps?: (userProps?: {}) => CellProps;

  // withGrouping
  getIsGrouped?: () => boolean;
  getIsPlaceholder?: () => boolean;
  getIsAggregated?: () => boolean;
}

export interface Plugin {
  name: string;
  after: string[];
  plugs: PluginPlugs;
}

export type Header<
  THeaderProps extends HeaderProps = HeaderProps,
  TFooterProps extends FooterProps = FooterProps,
> = TableColumn & {
  isPlaceholder: boolean;
  placeholderId: ColumnId;
  column: TableColumn;
  getHeaderProps: <TUserProps>(
    userProps: TUserProps,
  ) => TUserProps & THeaderProps;
  getFooterProps: <TUserProps>(
    userProps: TUserProps,
  ) => TUserProps & TFooterProps;
  getWidth: () => number;
  subHeaders: Header<THeaderProps, TFooterProps>[];
  colSpan: number;
  rowSpan: number;
};

export interface HeaderGroup {
  id: ColumnId;
  depth: number;
  headers: Header[];
  getHeaderGroupProps: (userProps?: {}) => HeaderProps;
  getFooterGroupProps: (userProps?: {}) => FooterProps;
}
export interface FooterGroup {
  headers: Header[];
}
export interface TableProps {}
export interface TableBodyProps {}
export interface TableHeadProps {}
export interface TableFooterProps {}
export interface HeaderGroupProps {}
export interface FooterGroupProps {}
export interface HeaderProps {}
export interface FooterProps {}
export interface RowProps {}
export interface CellProps {}

export type UseReduceOptions<
  TTableOptions extends TableOptions, // Required
  TTableInstance extends TableInstance, // Required
> = (
  options: unknown,
  { instance }: { instance: TTableInstance },
) => TTableOptions;

export type UseInstanceAfterState<
  TTableInstanceIn extends TableInstance, // Required
  TTableInstanceOut extends TableInstance, // Required
> = (instance: TTableInstanceIn) => TTableInstanceOut;

export type UseInstanceAfterDataModel<
  TTableInstanceIn extends TableInstance, // Required
  TTableInstanceOut extends TableInstance, // Required
> = (instance: TTableInstanceIn) => TTableInstanceOut;

// export type UseReduceColumns = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   columns: TableColumn[],
//   { instance }: { instance: TTableInstance }
// ) => TableColumn[]

// export type UseReduceAllColumns = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   allColumns: TableColumn[],
//   { instance }: { instance: TTableInstance }
// ) => TableColumn[]

// export type UseReduceLeafColumns = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   leafColumns: TableColumn[],
//   { instance }: { instance: TTableInstance }
// ) => TableColumn[]

// export type DecorateColumn = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   column: TableColumn,
//   { instance }: { instance: TTableInstance }
// ) => TableColumn

// export type UseReduceHeaderGroups = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   headerGroups: HeaderGroup[],
//   { instance }: { instance: TTableInstance }
// ) => HeaderGroup[]

// export type UseReduceFooterGroups = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   footerGroups: FooterGroup[],
//   { instance }: { instance: TTableInstance }
// ) => FooterGroup[]

// export type UseReduceFlatHeaders = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   flatHeaders: Header[],
//   { instance }: { instance: TTableInstance }
// ) => Header[]

export type DecorateHeader<
  THeaderIn extends Header = Header,
  THeaderOut extends Header = Header,
  TTableInstance extends TableInstance = TableInstance,
> = (
  header: THeaderIn,
  { instance }: { instance: TTableInstance },
) => THeaderOut;

// export type DecorateRow = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   row: Row,
//   { instance }: { instance: TTableInstance }
// ) => Row

// export type DecorateCell = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   cell: Cell,
//   { instance }: { instance: TTableInstance }
// ) => Cell

export type ReduceTableProps<
  TTableProps extends TableProps, // Required
  TTableInstance extends TableInstance, // Required
> = <TUserTableProps>(
  tableProps: unknown,
  { instance }: { instance: TTableInstance },
) => TUserTableProps & TTableProps;

export type ReduceTableBodyProps<
  TTableBodyProps extends TableBodyProps, // Required
  TTableInstance extends TableInstance, // Required
> = <TUserTableBodyProps>(
  tableBodyProps: unknown,
  { instance }: { instance: TTableInstance },
) => TUserTableBodyProps & TTableBodyProps;

export type ReduceTableHeadProps<
  TTableHeadProps extends TableHeadProps, // Required
  TTableInstance extends TableInstance, // Required
> = <TUserTableHeadProps>(
  tableHeadProps: unknown,
  { instance }: { instance: TTableInstance },
) => TUserTableHeadProps & TTableHeadProps;

export type ReduceTableFooterProps<
  TTableFooterProps extends TableFooterProps, // Required
  TTableInstance extends TableInstance, // Required
> = <TUserTableFooterProps>(
  tableFooterProps: unknown,
  { instance }: { instance: TTableInstance },
) => TUserTableFooterProps & TTableFooterProps;

// export type ReduceHeaderGroupProps = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   headerGroupProps: HeaderGroupProps,
//   { instance }: { instance: TTableInstance; headerGroup: HeaderGroup }
// ) => HeaderGroupProps

// export type ReduceFooterGroupProps = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   footerGroupProps: FooterGroupProps,
//   {
//     instance,
//     headerGroup,
//   }: { instance: TTableInstance; headerGroup: HeaderGroup }
// ) => FooterGroupProps

export type ReduceHeaderProps<
  THeaderPropsIn extends HeaderProps = HeaderProps,
  THeaderPropsOut extends HeaderProps = HeaderProps,
  TTableInstance extends TableInstance = TableInstance,
  THeader extends Header = Header,
> = (
  headerProps: THeaderPropsIn,
  { instance, header }: { instance: TTableInstance; header: THeader },
) => THeaderPropsOut;

export type ReduceFooterProps<
  TFooterPropsIn extends FooterProps = FooterProps,
  TFooterPropsOut extends FooterProps = FooterProps,
  TTableInstance extends TableInstance = TableInstance,
  THeader extends Header = Header,
> = (
  footerProps: TFooterPropsIn,
  { instance, header }: { instance: TTableInstance; header: THeader },
) => TFooterPropsOut;

// export type ReduceRowProps = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   rowProps: RowProps,
//   { instance, row }: { instance: TTableInstance; row: Row }
// ) => RowProps

// export type ReduceCellProps = <
//   TTableInstance extends TableInstance = TableInstance
// >(
//   cellProps: CellProps,
//   { instance, cell }: { instance: TTableInstance; cell: Cell }
// ) => CellProps

export type PluginPlugs = {
  useReduceOptions: UseReduceOptions<TableOptions, TableInstance>;
  useInstanceAfterState: UseInstanceAfterState<TableInstance, TableInstance>;
  useInstanceAfterDataModel: UseInstanceAfterDataModel<
    TableInstance,
    TableInstance
  >;
  // useReduceColumns: UseReduceColumns
  // useReduceAllColumns: UseReduceAllColumns
  // useReduceLeafColumns: UseReduceLeafColumns
  // decorateColumn: DecorateColumn
  // useReduceHeaderGroups: UseReduceHeaderGroups
  // useReduceFooterGroups: UseReduceFooterGroups
  // useReduceFlatHeaders: UseReduceFlatHeaders
  decorateHeader: DecorateHeader<Header, Header, TableInstance>;
  // decorateRow: DecorateRow
  // decorateCell: DecorateCell
  reduceTableProps: ReduceTableProps<TableProps, TableInstance>;
  reduceTableBodyProps: ReduceTableBodyProps<TableBodyProps, TableInstance>;
  reduceTableHeadProps: ReduceTableHeadProps<TableHeadProps, TableInstance>;
  reduceTableFooterProps: ReduceTableFooterProps<
    TableFooterProps,
    TableInstance
  >;
  // reduceHeaderGroupProps: ReduceHeaderGroupProps
  // reduceFooterGroupProps: ReduceFooterGroupProps
  reduceHeaderProps: ReduceHeaderProps<
    HeaderProps,
    HeaderProps,
    TableInstance,
    Header
  >;
  reduceFooterProps: ReduceFooterProps<
    FooterProps,
    FooterProps,
    TableInstance,
    Header
  >;
  // reduceRowProps: ReduceRowProps
  // reduceCellProps: ReduceCellProps
};

export interface PluginPlugFn {
  (...any: any): unknown;
  after?: string[];
}

export type PlugName = keyof PluginPlugs;

export type PlugType = [PlugName, any];

export interface RendererMeta {}

// withColumnFilters

export type FilterType =
  | 'text'
  | 'exactText'
  | 'exactTextCase'
  | 'includes'
  | 'includesAll'
  | 'exact'
  | 'equals'
  | 'between'
  | string
  | FilterFn;

export interface ColumnFilter {
  id: ColumnId;
  value: any;
}

export interface FilterFn {
  (rows: Row[], columnIds: ColumnId[], filterValue: any): Row[];
  autoRemove?: (filterValue: any, column?: TableColumn) => boolean;
}

// withColumnPinning

export interface ColumnPinning {
  left?: ColumnId[];
  right?: ColumnId[];
}

export type ColumnPinningSide = 'left' | 'right';
export type ColumnPinningStatus = ColumnPinningSide | false;

// withColumnResizing

export interface ColumnResizing {
  columnWidths?: Record<ColumnId, number>;
  isResizingColumn?: false | ColumnId;
  startX?: null | number;
  headerIdWidths?: [ColumnId, number][];
  columnWidth?: number;
}

export interface ResizerProps {
  onMouseDown?: unknown;
  onTouchStart?: unknown;
  draggable?: boolean;
  role?: 'separator' | string;
}

// withColumnVisibility
export type ColumnVisibility = Record<ColumnId, boolean>;

export interface ToggleAllColumnsVisibilityProps {
  onChange?: unknown;
  title?: string;
  checked?: boolean;
  indeterminate?: boolean;
}

export interface ToggleColumnVisibilityProps {
  type: 'checkbox' | any;
  onChange?: unknown;
  title?: string;
  checked?: boolean;
}

// withExpanding

export type Expanded = Record<RowId, boolean>;

export interface ToggleAllRowsExpandedProps {
  onClick?: unknown;
  title?: string;
}

export interface ToggleExpandedProps {
  onClick?: unknown;
  title?: string;
}

// withGrouping

export type Grouping = ColumnId[];

export type AggregationFn = (values: any[], aggregatedValues: any[]) => any;

export type AggregationType =
  | 'sum'
  | 'min'
  | 'max'
  | 'minMax'
  | 'average'
  | 'median'
  | 'unique'
  | 'uniqueCount'
  | 'count'
  | string
  | AggregationFn;

export type AggregateValueFn = (
  value: any,
  row: Row,
  column: TableColumn,
) => any;

export interface ToggleGroupingProps {
  onClick?: unknown;
  title?: string;
}

// withRowSelection
export interface ToggleAllRowsSelectedProps {
  onClick?: unknown;
  title?: string;
}

export interface ToggleAllPageRowsSelectedProps {
  onClick?: unknown;
  title?: string;
}

// withSorting

export interface SortObj {
  id: ColumnId;
  desc?: boolean;
}

export type SortType =
  | 'basic'
  | 'alphanumeric'
  | 'text'
  | 'datetime'
  | 'basic'
  | string
  | SortFn;

export type SortFn = (
  rowA: Row,
  rowB: Row,
  columnId: ColumnId,
  desc: boolean,
) => number;

export interface ToggleSortingProps {
  onClick?: unknown;
  title?: string;
}

// Utils

export type Identity<T> = T;
export type IntersectionIdentity<T> = {} & { [k in keyof T]: T[k] };

export type ComposeReducer = <TThrough, TMeta>(
  fns: ((initial: TThrough, meta: TMeta) => TThrough)[],
) => Reducer<TThrough, TMeta>;

export type Reducer<TThrough, TMeta> = (
  initial: TThrough,
  meta: TMeta,
) => TThrough;

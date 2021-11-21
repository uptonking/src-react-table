import React, { Component } from 'react';
import classnames from 'classnames';
import { TableProps } from './interfaces';
import _ from './utils';
import Lifecycle from './lifecycle';
import Methods from './methods';
import defaultProps from './defaultProps';

/** ReactTable组件的state类型 */
interface RTableState {
  /** 当前显示的页数，从0开始，默认为0 */
  page: number;
  /** 每页显示的列表项数 */
  pageSize: number;
  sorted: any[];
  expanded: any;
  filtered: any[];
  resized: any[];
  currentlyResizing: boolean;
  skipNextSort: boolean;
}

export const ReactTableDefaults = defaultProps;

/**
 * ReactTable v6 表格组件，数据基于分页显示
 */
export class ReactTable extends Methods(Lifecycle(Component)) {
  // static propTypes = propTypes;
  static defaultProps: TableProps = defaultProps;

  state: RTableState;

  constructor(props) {
    super(props);

    this.getResolvedState = this.getResolvedState.bind(this);
    this.getDataModel = this.getDataModel.bind(this);
    this.getSortedData = this.getSortedData.bind(this);
    this.fireFetchData = this.fireFetchData.bind(this);
    this.getPropOrState = this.getPropOrState.bind(this);
    this.getStateOrProp = this.getStateOrProp.bind(this);
    this.filterData = this.filterData.bind(this);
    this.sortData = this.sortData.bind(this);
    this.getMinRows = this.getMinRows.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.sortColumn = this.sortColumn.bind(this);
    this.filterColumn = this.filterColumn.bind(this);
    this.resizeColumnStart = this.resizeColumnStart.bind(this);
    this.resizeColumnEnd = this.resizeColumnEnd.bind(this);
    this.resizeColumnMoving = this.resizeColumnMoving.bind(this);

    this.state = {
      page: props.defaultPage,
      pageSize: props.defaultPageSize,
      sorted: props.defaultSorted,
      expanded: props.defaultExpanded,
      filtered: props.defaultFiltered,
      resized: props.defaultResized,
      currentlyResizing: false,
      skipNextSort: false,
    };
  }

  /**
   * 本子组件的实现只有一个render方法，大概800行代码，其他生命周期方法在父组件匿名类中
   */
  render() {
    console.log('====props4 ReactTable');
    // console.log(this.props);
    // console.log(this.state);
    // console.log('this.props.children, ', this.props.children);

    // 获取this.props和最新的state数据合并的大对象，包括defaultProps的值
    // const resolvedState = this.getResolvedState();
    const resolvedState = this.getResolvedState(undefined, undefined);
    // console.log('====RTable-resolvedState, ', resolvedState);

    const {
      children,
      className,
      style,
      getProps,
      getTableProps,
      getTheadGroupProps,
      getTheadGroupTrProps,
      getTheadGroupThProps,
      getTheadProps,
      getTheadTrProps,
      getTheadThProps,
      getTheadFilterProps,
      getTheadFilterTrProps,
      getTheadFilterThProps,
      getTbodyProps,
      getTrGroupProps,
      getTrProps,
      getTdProps,
      getTfootProps,
      getTfootTrProps,
      getTfootTdProps,
      getPaginationProps,
      getLoadingProps,
      getNoDataProps,
      getResizerProps,
      showPagination,
      showPaginationTop,
      showPaginationBottom,
      manual,
      loadingText,
      noDataText,
      sortable,
      multiSort,
      resizable,
      filterable,
      // Pivoting State
      pivotIDKey,
      pivotValKey,
      pivotBy,
      subRowsKey,
      aggregatedKey,
      originalKey,
      indexKey,
      groupedByPivotKey,
      // State
      loading,
      pageSize,
      page,
      sorted,
      filtered,
      resized,
      expanded,
      pages,
      onExpandedChange,
      // Components
      TableComponent,
      TheadComponent,
      TbodyComponent,
      TrGroupComponent,
      TrComponent,
      ThComponent,
      TdComponent,
      TfootComponent,
      PaginationComponent,
      LoadingComponent,
      SubComponent,
      NoDataComponent,
      ResizerComponent,
      ExpanderComponent,
      PivotValueComponent,
      PivotComponent,
      AggregatedComponent,
      FilterComponent,
      PadRowComponent,
      // Data model
      resolvedData,
      allVisibleColumns,
      headerGroups,
      hasHeaderGroups,
      // Sorted Data
      sortedData,
      currentlyResizing,
    } = resolvedState;

    // ==== Pagination
    //
    const startRow = pageSize * page;
    const endRow = startRow + pageSize;
    console.log('startRow, ', startRow);
    console.log('endRow, ', endRow);

    // manual属性代表要在服务端排序和分页，否则直接取出本次render要渲染的行
    let pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
    console.log('pageRows, ', pageRows);

    const minRows = this.getMinRows();
    // padRows为空白占位行，当本次render的pageRows行数小于属性中的minRows时，会在后面补充空行
    const padRows = _.range(Math.max(minRows - pageRows.length, 0));
    console.log('padRows, ', padRows);

    const hasColumnFooter = allVisibleColumns.some((d) => d.Footer);
    const hasFilters =
      filterable || allVisibleColumns.some((d) => d.filterable);

    //
    const recurseRowsViewIndex = (rows, path = [], index = -1) => [
      rows.map((row, i) => {
        index += 1;
        const rowWithViewIndex = {
          ...row,
          _viewIndex: index,
        };
        const newPath = path.concat([i]);
        if (
          rowWithViewIndex[subRowsKey] &&
          _.get(expanded, newPath, undefined)
        ) {
          [rowWithViewIndex[subRowsKey], index] = recurseRowsViewIndex(
            rowWithViewIndex[subRowsKey],
            newPath,
            index,
          );
        }
        return rowWithViewIndex;
      }),
      index,
    ];

    [pageRows] = recurseRowsViewIndex(pageRows);

    const canPrevious = page > 0;
    const canNext = page + 1 < pages;

    const rowMinWidth = _.sum(
      allVisibleColumns.map((d) => {
        const resizedColumn = resized.find((x) => x.id === d.id) || {};
        return _.getFirstDefined(resizedColumn.value, d.width, d.minWidth);
      }),
    );

    let rowIndex = -1;

    const finalState = {
      ...resolvedState,
      startRow,
      endRow,
      pageRows,
      minRows,
      padRows,
      hasColumnFooter,
      canPrevious,
      canNext,
      rowMinWidth,
    };

    const rootProps = _.splitProps(
      getProps(finalState, undefined, undefined, this),
    );
    const tableProps = _.splitProps(
      getTableProps(finalState, undefined, undefined, this),
    );
    const tBodyProps = _.splitProps(
      getTbodyProps(finalState, undefined, undefined, this),
    );
    const loadingProps = getLoadingProps(
      finalState,
      undefined,
      undefined,
      this,
    );
    const noDataProps = getNoDataProps(finalState, undefined, undefined, this);

    // ==== Visual Components

    const makeHeaderGroup = (column, i) => {
      const resizedValue = (col) =>
        (resized.find((x) => x.id === col.id) || {}).value;
      const flex = _.sum(
        column.columns.map((col) =>
          col.width || resizedValue(col) ? 0 : col.minWidth,
        ),
      );
      const width = _.sum(
        column.columns.map((col) =>
          _.getFirstDefined(resizedValue(col), col.width, col.minWidth),
        ),
      );
      const maxWidth = _.sum(
        column.columns.map((col) =>
          _.getFirstDefined(resizedValue(col), col.width, col.maxWidth),
        ),
      );

      const theadGroupThProps = _.splitProps(
        getTheadGroupThProps(finalState, undefined, column, this),
      );
      const columnHeaderProps = _.splitProps(
        column.getHeaderProps(finalState, undefined, column, this),
      );

      const classes = [
        column.headerClassName,
        theadGroupThProps.className,
        columnHeaderProps.className,
      ];

      const styles = {
        ...column.headerStyle,
        ...theadGroupThProps.style,
        ...columnHeaderProps.style,
      };

      const rest = {
        ...theadGroupThProps.rest,
        ...columnHeaderProps.rest,
      };

      const flexStyles = {
        flex: `${flex} 0 auto`,
        width: _.asPx(width),
        maxWidth: _.asPx(maxWidth),
      };

      return (
        <ThComponent
          key={`${i}-${column.id}`}
          className={classnames(classes)}
          style={{
            ...styles,
            ...flexStyles,
          }}
          {...rest}
        >
          {_.normalizeComponent(column.Header, {
            data: sortedData,
            column,
          })}
        </ThComponent>
      );
    };

    const makeHeaderGroups = () => {
      const theadGroupProps = _.splitProps(
        getTheadGroupProps(finalState, undefined, undefined, this),
      );
      const theadGroupTrProps = _.splitProps(
        getTheadGroupTrProps(finalState, undefined, undefined, this),
      );
      return (
        <TheadComponent
          className={classnames('-headerGroups', theadGroupProps.className)}
          style={{
            ...theadGroupProps.style,
            minWidth: `${rowMinWidth}px`,
          }}
          {...theadGroupProps.rest}
        >
          <TrComponent
            className={theadGroupTrProps.className}
            style={theadGroupTrProps.style}
            {...theadGroupTrProps.rest}
          >
            {headerGroups.map(makeHeaderGroup)}
          </TrComponent>
        </TheadComponent>
      );
    };

    const makeHeader = (column, i) => {
      const resizedCol = resized.find((x) => x.id === column.id) || {};
      const sort = sorted.find((d) => d.id === column.id);
      const show =
        typeof column.show === 'function' ? column.show() : column.show;
      const width = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.minWidth,
      );
      const maxWidth = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.maxWidth,
      );
      const theadThProps = _.splitProps(
        getTheadThProps(finalState, undefined, column, this),
      );
      const columnHeaderProps = _.splitProps(
        column.getHeaderProps(finalState, undefined, column, this),
      );

      const classes = [
        column.headerClassName,
        theadThProps.className,
        columnHeaderProps.className,
      ];

      const styles = {
        ...column.headerStyle,
        ...theadThProps.style,
        ...columnHeaderProps.style,
      };

      const rest = {
        ...theadThProps.rest,
        ...columnHeaderProps.rest,
      };

      const isResizable = _.getFirstDefined(column.resizable, resizable, false);
      const resizer = isResizable ? (
        <ResizerComponent
          onMouseDown={(e) => this.resizeColumnStart(e, column, false)}
          onTouchStart={(e) => this.resizeColumnStart(e, column, true)}
          {...getResizerProps('finalState', undefined, column, this)}
        />
      ) : null;

      const isSortable = _.getFirstDefined(column.sortable, sortable, false);

      return (
        <ThComponent
          key={`${i}-${column.id}`}
          className={classnames(
            classes,
            isResizable && 'rt-resizable-header',
            sort ? (sort.desc ? '-sort-desc' : '-sort-asc') : '',
            isSortable && '-cursor-pointer',
            !show && '-hidden',
            pivotBy &&
              pivotBy.slice(0, -1).includes(column.id) &&
              'rt-header-pivot',
          )}
          style={{
            ...styles,
            flex: `${width} 0 auto`,
            width: _.asPx(width),
            maxWidth: _.asPx(maxWidth),
          }}
          toggleSort={(e) => {
            if (isSortable)
              this.sortColumn(column, multiSort ? e.shiftKey : false);
          }}
          {...rest}
        >
          <div
            className={classnames(isResizable && 'rt-resizable-header-content')}
          >
            {_.normalizeComponent(column.Header, {
              data: sortedData,
              column,
            })}
          </div>
          {resizer}
        </ThComponent>
      );
    };

    const makeHeaders = () => {
      const theadProps = _.splitProps(
        getTheadProps(finalState, undefined, undefined, this),
      );
      const theadTrProps = _.splitProps(
        getTheadTrProps(finalState, undefined, undefined, this),
      );
      return (
        <TheadComponent
          className={classnames('-header', theadProps.className)}
          style={{
            ...theadProps.style,
            minWidth: `${rowMinWidth}px`,
          }}
          {...theadProps.rest}
        >
          <TrComponent
            className={theadTrProps.className}
            style={theadTrProps.style}
            {...theadTrProps.rest}
          >
            {allVisibleColumns.map(makeHeader)}
          </TrComponent>
        </TheadComponent>
      );
    };

    const makeFilter = (column, i) => {
      const resizedCol = resized.find((x) => x.id === column.id) || {};
      const width = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.minWidth,
      );
      const maxWidth = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.maxWidth,
      );
      const theadFilterThProps = _.splitProps(
        getTheadFilterThProps(finalState, undefined, column, this),
      );
      const columnHeaderProps = _.splitProps(
        column.getHeaderProps(finalState, undefined, column, this),
      );

      const classes = [
        column.headerClassName,
        theadFilterThProps.className,
        columnHeaderProps.className,
      ];

      const styles = {
        ...column.headerStyle,
        ...theadFilterThProps.style,
        ...columnHeaderProps.style,
      };

      const rest = {
        ...theadFilterThProps.rest,
        ...columnHeaderProps.rest,
      };

      const filter = filtered.find((filter) => filter.id === column.id);

      const ResolvedFilterComponent = column.Filter || FilterComponent;

      const isFilterable = _.getFirstDefined(
        column.filterable,
        filterable,
        false,
      );

      return (
        <ThComponent
          key={`${i}-${column.id}`}
          className={classnames(classes)}
          style={{
            ...styles,
            flex: `${width} 0 auto`,
            width: _.asPx(width),
            maxWidth: _.asPx(maxWidth),
          }}
          {...rest}
        >
          {isFilterable
            ? _.normalizeComponent(
                ResolvedFilterComponent,
                {
                  column,
                  filter,
                  onChange: (value) => this.filterColumn(column, value),
                },
                defaultProps.column.Filter,
              )
            : null}
        </ThComponent>
      );
    };

    const makeFilters = () => {
      const theadFilterProps = _.splitProps(
        getTheadFilterProps(finalState, undefined, undefined, this),
      );
      const theadFilterTrProps = _.splitProps(
        getTheadFilterTrProps(finalState, undefined, undefined, this),
      );
      return (
        <TheadComponent
          className={classnames('-filters', theadFilterProps.className)}
          style={{
            ...theadFilterProps.style,
            minWidth: `${rowMinWidth}px`,
          }}
          {...theadFilterProps.rest}
        >
          <TrComponent
            className={theadFilterTrProps.className}
            style={theadFilterTrProps.style}
            {...theadFilterTrProps.rest}
          >
            {allVisibleColumns.map(makeFilter)}
          </TrComponent>
        </TheadComponent>
      );
    };

    /**
     * 创建列表中数据的一行，行可包含分组
     * @param row  该行数据对象
     * @param i 数据索引，即第几列
     * @param path
     */
    const makePageRow = (row, i, path = []) => {
      // 先创建一个存放该行信息的对象
      const rowInfo = {
        original: row[originalKey],
        row,
        index: row[indexKey],
        viewIndex: (rowIndex += 1),
        pageSize,
        page,
        level: path.length,
        nestingPath: path.concat([i]),
        aggregated: row[aggregatedKey],
        groupedByPivot: row[groupedByPivotKey],
        subRows: row[subRowsKey],
      };

      const isExpanded = _.get(expanded, rowInfo.nestingPath, undefined);
      const trGroupProps = getTrGroupProps(
        finalState,
        rowInfo,
        undefined,
        this,
      );
      const trProps = _.splitProps(
        getTrProps(finalState, rowInfo, undefined, this),
      );

      return (
        <TrGroupComponent key={rowInfo.nestingPath.join('_')} {...trGroupProps}>
          <TrComponent
            className={classnames(
              trProps.className,
              row._viewIndex % 2 ? '-even' : '-odd',
            )}
            style={trProps.style}
            {...trProps.rest}
          >
            {allVisibleColumns.map((column, i2) => {
              const resizedCol = resized.find((x) => x.id === column.id) || {};
              const show =
                typeof column.show === 'function' ? column.show() : column.show;
              const width = _.getFirstDefined(
                resizedCol.value,
                column.width,
                column.minWidth,
              );
              const maxWidth = _.getFirstDefined(
                resizedCol.value,
                column.width,
                column.maxWidth,
              );
              const tdProps = _.splitProps(
                getTdProps(finalState, rowInfo, column, this),
              );
              const columnProps = _.splitProps(
                column.getProps(finalState, rowInfo, column, this),
              );

              const classes = [
                tdProps.className,
                column.className,
                columnProps.className,
              ];

              const styles = {
                ...tdProps.style,
                ...column.style,
                ...columnProps.style,
              };

              const cellInfo: any = {
                ...rowInfo,
                isExpanded,
                column: { ...column },
                value: rowInfo.row[column.id],
                pivoted: column.pivoted,
                expander: column.expander,
                resized,
                show,
                width,
                maxWidth,
                tdProps,
                columnProps,
                classes,
                styles,
              };

              const value = cellInfo.value;

              let useOnExpanderClick;
              let isBranch;
              let isPreview;

              const onExpanderClick = (e) => {
                let newExpanded = _.clone(expanded);
                if (isExpanded) {
                  newExpanded = _.set(newExpanded, cellInfo.nestingPath, false);
                } else {
                  newExpanded = _.set(newExpanded, cellInfo.nestingPath, {});
                }

                return this.setStateWithData(
                  {
                    expanded: newExpanded,
                  },
                  () =>
                    onExpandedChange &&
                    onExpandedChange(newExpanded, cellInfo.nestingPath, e),
                );
              };

              // Default to a standard cell
              let resolvedCell = _.normalizeComponent(
                column.Cell,
                cellInfo,
                value,
              );

              // Resolve Renderers
              const ResolvedAggregatedComponent =
                column.Aggregated ||
                (!column.aggregate ? AggregatedComponent : column.Cell);
              const ResolvedExpanderComponent =
                column.Expander || ExpanderComponent;
              const ResolvedPivotValueComponent =
                column.PivotValue || PivotValueComponent;
              const DefaultResolvedPivotComponent =
                PivotComponent ||
                ((props) => (
                  <div>
                    <ResolvedExpanderComponent {...props} />
                    <ResolvedPivotValueComponent {...props} />
                  </div>
                ));
              const ResolvedPivotComponent =
                column.Pivot || DefaultResolvedPivotComponent;

              // Is this cell expandable?
              if (cellInfo.pivoted || cellInfo.expander) {
                // Make it expandable by defualt
                cellInfo.expandable = true;
                useOnExpanderClick = true;
                // If pivoted, has no subRows, and does not have a subComponent,
                // do not make expandable
                if (cellInfo.pivoted && !cellInfo.subRows && !SubComponent) {
                  cellInfo.expandable = false;
                }
              }

              if (cellInfo.pivoted) {
                // Is this column a branch?
                isBranch =
                  rowInfo.row[pivotIDKey] === column.id && cellInfo.subRows;
                // Should this column be blank?
                isPreview =
                  pivotBy.indexOf(column.id) >
                    pivotBy.indexOf(rowInfo.row[pivotIDKey]) &&
                  cellInfo.subRows;
                // Pivot Cell Render Override
                if (isBranch) {
                  // isPivot
                  resolvedCell = _.normalizeComponent(
                    ResolvedPivotComponent,
                    {
                      ...cellInfo,
                      value: row[pivotValKey],
                    },
                    row[pivotValKey],
                  );
                } else if (isPreview) {
                  // Show the pivot preview
                  resolvedCell = _.normalizeComponent(
                    ResolvedAggregatedComponent,
                    cellInfo,
                    value,
                  );
                } else {
                  resolvedCell = null;
                }
              } else if (cellInfo.aggregated) {
                resolvedCell = _.normalizeComponent(
                  ResolvedAggregatedComponent,
                  cellInfo,
                  value,
                );
              }

              if (cellInfo.expander) {
                resolvedCell = _.normalizeComponent(
                  ResolvedExpanderComponent,
                  cellInfo,
                  row[pivotValKey],
                );
                if (pivotBy) {
                  if (cellInfo.groupedByPivot) {
                    resolvedCell = null;
                  }
                  if (!cellInfo.subRows && !SubComponent) {
                    resolvedCell = null;
                  }
                }
              }

              const resolvedOnExpanderClick = useOnExpanderClick
                ? onExpanderClick
                : () => {};

              // If there are multiple onClick events, make sure they don't
              // override eachother. This should maybe be expanded to handle all
              // function attributes
              const interactionProps = {
                onClick: resolvedOnExpanderClick,
              };

              if (tdProps.rest.onClick) {
                interactionProps.onClick = (e) => {
                  tdProps.rest.onClick(e, () => resolvedOnExpanderClick(e));
                };
              }

              if (columnProps.rest.onClick) {
                interactionProps.onClick = (e) => {
                  columnProps.rest.onClick(e, () => resolvedOnExpanderClick(e));
                };
              }

              // Return the cell
              return (
                <TdComponent
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${i2}-${column.id}`}
                  className={classnames(
                    classes,
                    !cellInfo.expandable && !show && 'hidden',
                    cellInfo.expandable && 'rt-expandable',
                    (isBranch || isPreview) && 'rt-pivot',
                  )}
                  style={{
                    ...styles,
                    flex: `${width} 0 auto`,
                    width: _.asPx(width),
                    maxWidth: _.asPx(maxWidth),
                  }}
                  {...tdProps.rest}
                  {...columnProps.rest}
                  {...interactionProps}
                >
                  {resolvedCell}
                </TdComponent>
              );
            })}
          </TrComponent>

          {/* 表中表或表中子组件的处理 */}
          {rowInfo.subRows &&
            isExpanded &&
            rowInfo.subRows.map((d, i) =>
              makePageRow(d, i, rowInfo.nestingPath),
            )}

          {SubComponent &&
            !rowInfo.subRows &&
            isExpanded &&
            SubComponent(rowInfo, () => {
              const newExpanded = _.clone(expanded);

              _.set(newExpanded, rowInfo.nestingPath, false);
            })}
        </TrGroupComponent>
      );
    };

    const makePadColumn = (column, i) => {
      const resizedCol = resized.find((x) => x.id === column.id) || {};
      const show =
        typeof column.show === 'function' ? column.show() : column.show;
      const width = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.minWidth,
      );
      const flex = width;
      const maxWidth = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.maxWidth,
      );
      const tdProps = _.splitProps(
        getTdProps(finalState, undefined, column, this),
      );
      const columnProps = _.splitProps(
        column.getProps(finalState, undefined, column, this),
      );

      const classes = [
        tdProps.className,
        column.className,
        columnProps.className,
      ];

      const styles = {
        ...tdProps.style,
        ...column.style,
        ...columnProps.style,
      };

      return (
        <TdComponent
          key={`${i}-${column.id}`}
          className={classnames(classes, !show && 'hidden')}
          style={{
            ...styles,
            flex: `${flex} 0 auto`,
            width: _.asPx(width),
            maxWidth: _.asPx(maxWidth),
          }}
          {...tdProps.rest}
        >
          {_.normalizeComponent(PadRowComponent)}
        </TdComponent>
      );
    };

    const makePadRow = (row, i) => {
      const trGroupProps = getTrGroupProps(
        finalState,
        undefined,
        undefined,
        this,
      );
      const trProps = _.splitProps(
        getTrProps(finalState, undefined, undefined, this),
      );
      return (
        <TrGroupComponent key={`pad-${i}`} {...trGroupProps}>
          <TrComponent
            className={classnames(
              '-padRow',
              (pageRows.length + i) % 2 ? '-even' : '-odd',
              trProps.className,
            )}
            style={trProps.style || {}}
          >
            {allVisibleColumns.map(makePadColumn)}
          </TrComponent>
        </TrGroupComponent>
      );
    };

    const makeColumnFooter = (column, i) => {
      const resizedCol = resized.find((x) => x.id === column.id) || {};
      const show =
        typeof column.show === 'function' ? column.show() : column.show;
      const width = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.minWidth,
      );
      const maxWidth = _.getFirstDefined(
        resizedCol.value,
        column.width,
        column.maxWidth,
      );
      const tFootTdProps = _.splitProps(
        getTfootTdProps(finalState, undefined, undefined, this),
      );
      const columnProps = _.splitProps(
        column.getProps(finalState, undefined, column, this),
      );
      const columnFooterProps = _.splitProps(
        column.getFooterProps(finalState, undefined, column, this),
      );

      const classes = [
        tFootTdProps.className,
        column.className,
        columnProps.className,
        columnFooterProps.className,
      ];

      const styles = {
        ...tFootTdProps.style,
        ...column.style,
        ...columnProps.style,
        ...columnFooterProps.style,
      };

      return (
        <TdComponent
          key={`${i}-${column.id}`}
          className={classnames(classes, !show && 'hidden')}
          style={{
            ...styles,
            flex: `${width} 0 auto`,
            width: _.asPx(width),
            maxWidth: _.asPx(maxWidth),
          }}
          {...columnProps.rest}
          {...tFootTdProps.rest}
          {...columnFooterProps.rest}
        >
          {_.normalizeComponent(column.Footer, {
            data: sortedData,
            column,
          })}
        </TdComponent>
      );
    };

    const makeColumnFooters = () => {
      const tFootProps = _.splitProps(
        getTfootProps(finalState, undefined, undefined, this),
      );
      const tFootTrProps = _.splitProps(
        getTfootTrProps(finalState, undefined, undefined, this),
      );
      return (
        <TfootComponent
          className={tFootProps.className}
          style={{
            ...tFootProps.style,
            minWidth: `${rowMinWidth}px`,
          }}
          {...tFootProps.rest}
        >
          <TrComponent
            className={classnames(tFootTrProps.className)}
            style={tFootTrProps.style}
            {...tFootTrProps.rest}
          >
            {allVisibleColumns.map(makeColumnFooter)}
          </TrComponent>
        </TfootComponent>
      );
    };

    const makePagination = (isTop) => {
      const paginationProps = _.splitProps(
        getPaginationProps(finalState, undefined, undefined, this),
      );
      return (
        <PaginationComponent
          {...resolvedState}
          pages={pages}
          canPrevious={canPrevious}
          canNext={canNext}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          className={paginationProps.className}
          style={paginationProps.style}
          isTop={isTop}
          {...paginationProps.rest}
        />
      );
    };

    const makeTable = () => (
      // 最外层接收样式
      <div
        className={classnames('ReactTable', className, rootProps.className)}
        style={{
          ...style,
          ...rootProps.style,
        }}
        {...rootProps.rest}
      >
        {/* 若是在顶部显示分页 */}
        {showPagination && showPaginationTop ? (
          <div className='pagination-top'>{makePagination(true)}</div>
        ) : null}

        {/* 列表组件主要部分，包括分组合并的列头、过滤器、列表内容、页脚标注 */}
        <TableComponent
          className={classnames(
            tableProps.className,
            currentlyResizing ? 'rt-resizing' : '',
          )}
          style={tableProps.style}
          {...tableProps.rest}
        >
          {hasHeaderGroups ? makeHeaderGroups() : null}

          {makeHeaders()}

          {hasFilters ? makeFilters() : null}

          <TbodyComponent
            className={classnames(tBodyProps.className)}
            style={{
              ...tBodyProps.style,
              minWidth: `${rowMinWidth}px`,
            }}
            {...tBodyProps.rest}
          >
            {/* console.log('TbodyComponent, ',pageRows) */}
            {pageRows.map((d, i) => makePageRow(d, i))}

            {padRows.map(makePadRow)}
          </TbodyComponent>

          {hasColumnFooter ? makeColumnFooters() : null}
        </TableComponent>

        {/* 在底部显示分页 */}
        {showPagination && showPaginationBottom ? (
          <div className='pagination-bottom'>{makePagination(false)}</div>
        ) : null}

        {/* 若数据为空，则显示空的占位组件 */}
        {!pageRows.length && (
          <NoDataComponent {...noDataProps}>
            {_.normalizeComponent(noDataText)}
          </NoDataComponent>
        )}

        {/* 加载指示器组件 */}
        <LoadingComponent
          loading={loading}
          loadingText={loadingText}
          {...loadingProps}
        />
      </div>
    );

    // console.log('before call Table-render-return ');
    // childProps are optionally passed to a function-as-a-child
    return children ? children(finalState, makeTable, this) : makeTable();
  }
}

export default ReactTable;

import React from 'react';
import _ from './utils';

/**
 * 给列表组件添加通用操作方法，主要包括sort,filter,resize，不包括生命周期方法
 */
export default (Base: React.ComponentClass<any, any>) =>
  // export default Base =>
  class extends Base {
    // 下面到空行前的成员都是防类型检查报错临时添加的
    /** 内部包含调用this.setState()的方法 */
    setStateWithData: Function;
    /** 初始数据或对初始数据调用resolvedData()方法后得到的对象 */
    resolvedData: any;
    trapEvents: boolean;

    /**
     * 合并this.props/state和传入参数props/state的属性值，返回一个包含列表最新状态数据的对象
     * @param props 传入的props数据，初次mount会传入undefined
     * @param state 传入的state数据，初次mount会传入undefined
     */
    getResolvedState(props, state) {
      const resolvedState: any = {
        ..._.compactObject(this.state),
        ..._.compactObject(this.props),
        ..._.compactObject(state),
        ..._.compactObject(props),
      };
      return resolvedState;
    }

    /**
     * 根据参数newState数据计算列合并分组数据和透视数据，最后将计算出的数据与newState数据的属性合并再返回一个大对象
     * @param newState 列表最新状态数据
     * @param dataChanged 列表数据是否已改变
     */
    getDataModel(newState: any, dataChanged: boolean) {
      const {
        columns,
        pivotBy = [],
        data,
        resolveData,
        pivotIDKey,
        pivotValKey,
        subRowsKey,
        aggregatedKey,
        nestingLevelKey,
        originalKey,
        indexKey,
        groupedByPivotKey,
        SubComponent,
      } = newState;

      // Determine if there are Header Groups，若columns属性值中也存在columns属性，则使用分组合并列
      let hasHeaderGroups = false;
      columns.forEach(column => {
        if (column.columns) {
          hasHeaderGroups = true;
        }
      });

      // 拷贝一份columns属性值
      let columnsWithExpander = [...columns];

      // 若设置了expander属性，则获取第一个可展开的列
      let expanderColumn = columns.find(
        col => col.expander || (col.columns && col.columns.some(col2 => col2.expander)),
      );
      if (expanderColumn && !expanderColumn.expander) {
        expanderColumn = expanderColumn.columns.find(col => col.expander);
      }
      // If we have SubComponent's we need to make sure we have an expander column
      if (SubComponent && !expanderColumn) {
        expanderColumn = { expander: true };
        columnsWithExpander = [expanderColumn, ...columnsWithExpander];
      }

      // 定义一个方法，给该列column添加额外属性，包括列操作相关属性、父列、列取值的accessor
      const makeDecoratedColumn = (column, parentColumn) => {
        // 给列名加上列操作相关属性后生成一个新对象
        let dcol;
        // 若该列可展开
        if (column.expander) {
          dcol = {
            ...this.props.column,
            ...this.props.expanderDefaults,
            ...column,
          };
        } else {
          dcol = {
            ...this.props.column,
            ...column,
          };
        }

        // Ensure minWidth is not greater than maxWidth if set
        if (dcol.maxWidth < dcol.minWidth) {
          dcol.minWidth = dcol.maxWidth;
        }

        // 再加上父列属性
        if (parentColumn) {
          dcol.parentColumn = parentColumn;
        }

        // console.log(dcol.accessor);
        // console.log('typeof dcol.accessor === string', typeof dcol.accessor === 'string');

        // 将字符串形式的accessor属性值转换成函数，再合并到dcol
        // First check for string accessor
        if (typeof dcol.accessor === 'string') {
          dcol.id = dcol.id || dcol.accessor;
          const accessorString = dcol.accessor;
          // dcol.accessor = row => _.get(row, accessorString)
          dcol.accessor = row => _.get(row, accessorString, undefined);
          return dcol;
        }

        // Fall back to functional accessor (but require an ID)
        if (dcol.accessor && !dcol.id) {
          console.warn(dcol);
          throw new Error('A column id is required if using a non-string accessor for column above.');
        }

        // Fall back to an undefined accessor
        if (!dcol.accessor) {
          dcol.accessor = () => undefined;
        }

        return dcol;
      };

      const allDecoratedColumns = [];

      // Decorate the columns 给该列column添加额外信息并返回新列对象
      const decorateAndAddToAll = (column, parentColumn) => {
        const decoratedColumn = makeDecoratedColumn(column, parentColumn);
        allDecoratedColumns.push(decoratedColumn);
        return decoratedColumn;
      };

      // 遍历columns属性值数组，给各项column补充额外操作信息
      const decoratedColumns = columnsWithExpander.map(column => {
        // 若该列是分组合并列，
        if (column.columns) {
          return {
            ...column,
            columns: column.columns.map(d => decorateAndAddToAll(d, column)),
          };
        }

        // 若该列不是分组合并列
        // return decorateAndAddToAll(column)
        return decorateAndAddToAll(column, undefined);
      });

      // Build the visible columns, headers and flat column list，再把装饰后的columns拷贝一份
      let visibleColumns = decoratedColumns.slice();
      let allVisibleColumns = [];

      visibleColumns = visibleColumns.map(column => {
        if (column.columns) {
          const visibleSubColumns = column.columns.filter(d =>
            // 若pivotBy中不存在id，则过滤掉此列
            pivotBy.indexOf(d.id) > -1 ? false : _.getFirstDefined(d.show, true),
          );
          return {
            ...column,
            columns: visibleSubColumns,
          };
        }

        return column;
      });

      visibleColumns = visibleColumns.filter(column =>
        column.columns
          ? column.columns.length
          : pivotBy.indexOf(column.id) > -1
          ? false
          : _.getFirstDefined(column.show, true),
      );
      // console.log('visibleColumns-before-pivotIndex, ', visibleColumns);

      // Find any custom pivot location
      const pivotIndex = visibleColumns.findIndex(col => col.pivot);

      // Handle Pivot Columns
      if (pivotBy.length) {
        // Retrieve the pivot columns in the correct pivot order
        const pivotColumns = [];
        pivotBy.forEach(pivotID => {
          const found = allDecoratedColumns.find(d => d.id === pivotID);
          if (found) {
            pivotColumns.push(found);
          }
        });

        const PivotParentColumn = pivotColumns.reduce(
          (prev, current) => prev && prev === current.parentColumn && current.parentColumn,
          pivotColumns[0].parentColumn,
        );

        let PivotGroupHeader: any = hasHeaderGroups && PivotParentColumn.Header;
        PivotGroupHeader = PivotGroupHeader || (() => <strong>Pivoted</strong>);

        let pivotColumnGroup = {
          Header: PivotGroupHeader,
          columns: pivotColumns.map(col => ({
            ...this.props.pivotDefaults,
            ...col,
            pivoted: true,
          })),
        };

        // Place the pivotColumns back into the visibleColumns
        if (pivotIndex >= 0) {
          pivotColumnGroup = {
            ...visibleColumns[pivotIndex],
            ...pivotColumnGroup,
          };
          visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
        } else {
          visibleColumns.unshift(pivotColumnGroup);
        }
      }

      // Build Header Groups
      const headerGroups = [];
      let currentSpan = [];

      // 定义一个函数，将column添加到headerGroups
      // A convenience function to add a header and reset the currentSpan
      const addHeader = (columns, column) => {
        headerGroups.push({
          ...this.props.column,
          ...column,
          columns,
        });

        currentSpan = [];
      };

      // 遍历可见列，将可见列加入headerGroups
      // Build flat list of allVisibleColumns and HeaderGroups
      visibleColumns.forEach(column => {
        if (column.columns) {
          allVisibleColumns = allVisibleColumns.concat(column.columns);
          if (currentSpan.length > 0) {
            // addHeader(currentSpan);
            addHeader(currentSpan, undefined);
          }
          addHeader(column.columns, column);
          return;
        }

        allVisibleColumns.push(column);
        currentSpan.push(column);
      });

      if (hasHeaderGroups && currentSpan.length > 0) {
        // addHeader(currentSpan);
        addHeader(currentSpan, undefined);
      }

      // 定义一个方法，获取某行的数据
      // Access the data
      const accessRow = (d, i, level = 0) => {
        const row = {
          [originalKey]: d,
          [indexKey]: i,
          [subRowsKey]: d[subRowsKey],
          [nestingLevelKey]: level,
        };

        // 遍历所有列，将列数据添加到行
        allDecoratedColumns.forEach(column => {
          if (column.expander) return;
          row[column.id] = column.accessor(d);
        });

        if (row[subRowsKey]) {
          row[subRowsKey] = row[subRowsKey].map((d, i) => accessRow(d, i, level + 1));
        }
        return row;
      };

      // resolvedData就是初始数据，或是初始数据调用resolveData()方法后得到的数据，此时包含初始数据所有字段
      // If the data hasn't changed, just use the cached data
      let resolvedData = this.resolvedData;

      // If the data has changed, run the data resolver and cache the result
      if (!this.resolvedData || dataChanged) {
        resolvedData = resolveData(data);
        this.resolvedData = resolvedData;
      }
      // console.log('resolvedData, ', resolvedData);

      // 遍历初始数据data或处理后的数据resolvedData，将其中的行列数据取出来，此时剔除了无关列，字段名也变成了columns属性设置的
      // Use the resolved data
      resolvedData = resolvedData.map((d, i) => accessRow(d, i));
      // console.log('resolvedData-accessRow, ', resolvedData);

      // 在没有分组聚合的情况下，aggregatingColumns为[]
      // TODO: Make it possible to fabricate nested rows without pivoting
      const aggregatingColumns = allVisibleColumns.filter(d => !d.expander && d.aggregate);
      // console.log('aggregatingColumns, ', aggregatingColumns);

      // If pivoting, recursively group the data
      const aggregate = rows => {
        const aggregationValues = {};
        aggregatingColumns.forEach(column => {
          const values = rows.map(d => d[column.id]);
          aggregationValues[column.id] = column.aggregate(values, rows);
        });
        return aggregationValues;
      };

      // console.log('pivotBy, ', pivotBy);

      // 若指定了透视列，pivotBy默认值为[]
      if (pivotBy.length) {
        const groupRecursively = (rows, keys, i = 0) => {
          // This is the last level, just return the rows
          if (i === keys.length) {
            return rows;
          }
          // Group the rows together for this level
          let groupedRows = Object.entries(_.groupBy(rows, keys[i])).map(([key, value]) => ({
            [pivotIDKey]: keys[i],
            [pivotValKey]: key,
            [keys[i]]: key,
            [subRowsKey]: value,
            [nestingLevelKey]: i,
            [groupedByPivotKey]: true,
          }));
          // Recurse into the subRows
          groupedRows = groupedRows.map(rowGroup => {
            const subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
            return {
              ...rowGroup,
              [subRowsKey]: subRows,
              [aggregatedKey]: true,
              ...aggregate(subRows),
            };
          });
          return groupedRows;
        };
        resolvedData = groupRecursively(resolvedData, pivotBy);
      }

      // 返回添加了新属性的大对象
      return {
        ...newState,
        resolvedData,
        hasHeaderGroups,
        headerGroups,
        allVisibleColumns,
        allDecoratedColumns,
      };
    }

    getSortedData(resolvedState) {
      const {
        manual,
        sorted,
        filtered,
        defaultFilterMethod,
        resolvedData,
        allVisibleColumns,
        allDecoratedColumns,
      } = resolvedState;

      const sortMethodsByColumnID = {};

      allDecoratedColumns
        .filter(col => col.sortMethod)
        .forEach(col => {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

      // Resolve the data from either manual data or sorted data
      return {
        sortedData: manual
          ? resolvedData
          : this.sortData(
              this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns),
              sorted,
              sortMethodsByColumnID,
            ),
      };
    }

    /**
     * 从服务端获取新数据，onFetchData默认为空
     */
    fireFetchData() {
      // console.log('====fireFetchData, ', this.props.onFetchData);

      // determine the current state, preferring certain state values over props
      const currentState = {
        // ...this.getResolvedState(),
        ...this.getResolvedState(undefined, undefined),
        page: this.getStateOrProp('page'),
        pageSize: this.getStateOrProp('pageSize'),
        filter: this.getStateOrProp('filter'),
      };

      this.props.onFetchData(currentState, this);
    }

    getPropOrState(key) {
      return _.getFirstDefined(this.props[key], this.state[key]);
    }

    getStateOrProp(key) {
      return _.getFirstDefined(this.state[key], this.props[key]);
    }

    filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
      let filteredData = data;

      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          const column = allVisibleColumns.find(x => x.id === nextFilter.id);

          // Don't filter hidden columns or columns that have had their filters disabled
          if (!column || column.filterable === false) {
            return filteredSoFar;
          }

          const filterMethod = column.filterMethod || defaultFilterMethod;

          // If 'filterAll' is set to true, pass the entire dataset to the filter method
          if (column.filterAll) {
            return filterMethod(nextFilter, filteredSoFar, column);
          }
          return filteredSoFar.filter(row => filterMethod(nextFilter, row, column));
        }, filteredData);

        // Apply the filter to the subrows if we are pivoting, and then
        // filter any rows without subcolumns because it would be strange to show
        filteredData = filteredData
          .map(row => {
            if (!row[this.props.subRowsKey]) {
              return row;
            }
            return {
              ...row,
              [this.props.subRowsKey]: this.filterData(
                row[this.props.subRowsKey],
                filtered,
                defaultFilterMethod,
                allVisibleColumns,
              ),
            };
          })
          .filter(row => {
            if (!row[this.props.subRowsKey]) {
              return true;
            }
            return row[this.props.subRowsKey].length > 0;
          });
      }

      return filteredData;
    }

    sortData(data, sorted, sortMethodsByColumnID = {}) {
      if (!sorted.length) {
        return data;
      }

      const sortedData = (this.props.orderByMethod || _.orderBy)(
        data,
        sorted.map(sort => {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return (a, b) => sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
          }
          return (a, b) => this.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
        }),
        sorted.map(d => !d.desc),
        this.props.indexKey,
      );

      sortedData.forEach(row => {
        if (!row[this.props.subRowsKey]) {
          return;
        }
        row[this.props.subRowsKey] = this.sortData(row[this.props.subRowsKey], sorted, sortMethodsByColumnID);
      });

      return sortedData;
    }

    getMinRows() {
      return _.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
    }

    // User actions
    onPageChange(page) {
      const { onPageChange, collapseOnPageChange } = this.props;

      const newState: any = { page };
      if (collapseOnPageChange) {
        newState.expanded = {};
      }
      this.setStateWithData(newState, () => onPageChange && onPageChange(page));
    }

    onPageSizeChange(newPageSize) {
      const { onPageSizeChange } = this.props;
      // const { pageSize, page } = this.getResolvedState();
      const { pageSize, page } = this.getResolvedState(undefined, undefined);

      // Normalize the page to display
      const currentRow = pageSize * page;
      const newPage = Math.floor(currentRow / newPageSize);

      this.setStateWithData(
        {
          pageSize: newPageSize,
          page: newPage,
        },
        () => onPageSizeChange && onPageSizeChange(newPageSize, newPage),
      );
    }

    sortColumn(column, additive) {
      // const { sorted, skipNextSort, defaultSortDesc } = this.getResolvedState();
      const { sorted, skipNextSort, defaultSortDesc } = this.getResolvedState(undefined, undefined);

      const firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc')
        ? column.defaultSortDesc
        : defaultSortDesc;
      const secondSortDirection = !firstSortDirection;

      // we can't stop event propagation from the column resize move handlers
      // attached to the document because of react's synthetic events
      // so we have to prevent the sort function from actually sorting
      // if we click on the column resize element within a header.
      if (skipNextSort) {
        this.setStateWithData(
          {
            skipNextSort: false,
          },
          undefined,
        );
        return;
      }

      const { onSortedChange } = this.props;

      let newSorted = _.clone(sorted || []).map(d => {
        d.desc = _.isSortingDesc(d);
        return d;
      });
      if (!_.isArray(column)) {
        // Single-Sort
        const existingIndex = newSorted.findIndex(d => d.id === column.id);
        if (existingIndex > -1) {
          const existing = newSorted[existingIndex];
          if (existing.desc === secondSortDirection) {
            if (additive) {
              newSorted.splice(existingIndex, 1);
            } else {
              existing.desc = firstSortDirection;
              newSorted = [existing];
            }
          } else {
            existing.desc = secondSortDirection;
            if (!additive) {
              newSorted = [existing];
            }
          }
        } else if (additive) {
          newSorted.push({
            id: column.id,
            desc: firstSortDirection,
          });
        } else {
          newSorted = [
            {
              id: column.id,
              desc: firstSortDirection,
            },
          ];
        }
      } else {
        // Multi-Sort
        const existingIndex = newSorted.findIndex(d => d.id === column[0].id);
        // Existing Sorted Column
        if (existingIndex > -1) {
          const existing = newSorted[existingIndex];
          if (existing.desc === secondSortDirection) {
            if (additive) {
              newSorted.splice(existingIndex, column.length);
            } else {
              column.forEach((d, i) => {
                newSorted[existingIndex + i].desc = firstSortDirection;
              });
            }
          } else {
            column.forEach((d, i) => {
              newSorted[existingIndex + i].desc = secondSortDirection;
            });
          }
          if (!additive) {
            newSorted = newSorted.slice(existingIndex, column.length);
          }
          // New Sort Column
        } else if (additive) {
          newSorted = newSorted.concat(
            column.map(d => ({
              id: d.id,
              desc: firstSortDirection,
            })),
          );
        } else {
          newSorted = column.map(d => ({
            id: d.id,
            desc: firstSortDirection,
          }));
        }
      }

      this.setStateWithData(
        {
          page: (!sorted.length && newSorted.length) || !additive ? 0 : this.state.page,
          sorted: newSorted,
        },
        () => onSortedChange && onSortedChange(newSorted, column, additive),
      );
    }

    filterColumn(column, value) {
      // const { filtered } = this.getResolvedState();
      const { filtered } = this.getResolvedState(undefined, undefined);
      const { onFilteredChange } = this.props;

      // Remove old filter first if it exists
      const newFiltering = (filtered || []).filter(x => x.id !== column.id);

      if (value !== '') {
        newFiltering.push({
          id: column.id,
          value,
        });
      }

      this.setStateWithData(
        {
          filtered: newFiltering,
        },
        () => onFilteredChange && onFilteredChange(newFiltering, column, value),
      );
    }

    resizeColumnStart(event, column, isTouch) {
      event.stopPropagation();
      const parentWidth = event.target.parentElement.getBoundingClientRect().width;

      let pageX;
      if (isTouch) {
        pageX = event.changedTouches[0].pageX;
      } else {
        pageX = event.pageX;
      }

      this.trapEvents = true;
      this.setStateWithData(
        {
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth,
          },
        },
        () => {
          if (isTouch) {
            document.addEventListener('touchmove', this.resizeColumnMoving);
            document.addEventListener('touchcancel', this.resizeColumnEnd);
            document.addEventListener('touchend', this.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', this.resizeColumnMoving);
            document.addEventListener('mouseup', this.resizeColumnEnd);
            document.addEventListener('mouseleave', this.resizeColumnEnd);
          }
        },
      );
    }

    resizeColumnMoving(event) {
      event.stopPropagation();
      const { onResizedChange, column } = this.props;
      // const { resized, currentlyResizing, columns } = this.getResolvedState();
      const { resized, currentlyResizing, columns } = this.getResolvedState(undefined, undefined);
      const currentColumn = columns.find(c => c.accessor === currentlyResizing.id);
      const minResizeWidth = currentColumn ? currentColumn.minResizeWidth : column.minResizeWidth;

      // Delete old value
      const newResized = resized.filter(x => x.id !== currentlyResizing.id);

      let pageX;

      if (event.type === 'touchmove') {
        pageX = event.changedTouches[0].pageX;
      } else if (event.type === 'mousemove') {
        pageX = event.pageX;
      }

      const newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, minResizeWidth);

      newResized.push({
        id: currentlyResizing.id,
        value: newWidth,
      });

      this.setStateWithData(
        {
          resized: newResized,
        },
        () => onResizedChange && onResizedChange(newResized, event),
      );
    }

    resizeColumnEnd(event) {
      event.stopPropagation();
      const isTouch = event.type === 'touchend' || event.type === 'touchcancel';

      if (isTouch) {
        document.removeEventListener('touchmove', this.resizeColumnMoving);
        document.removeEventListener('touchcancel', this.resizeColumnEnd);
        document.removeEventListener('touchend', this.resizeColumnEnd);
      }

      // If its a touch event clear the mouse one's as well because sometimes
      // the mouseDown event gets called as well, but the mouseUp event doesn't
      document.removeEventListener('mousemove', this.resizeColumnMoving);
      document.removeEventListener('mouseup', this.resizeColumnEnd);
      document.removeEventListener('mouseleave', this.resizeColumnEnd);

      // The touch events don't propagate up to the sorting's onMouseDown event so
      // no need to prevent it from happening or else the first click after a touch
      // event resize will not sort the column.
      if (!isTouch) {
        this.setStateWithData(
          {
            skipNextSort: true,
            currentlyResizing: false,
          },
          undefined,
        );
      }
    }
  };

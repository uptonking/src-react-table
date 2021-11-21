import React from 'react';

/**
 * 给React.Component的生命周期函数添加列表数据处理逻辑
 */
export default (Base: React.ComponentClass<any, any>) =>
  // export default Base =>
  class extends Base {
    // 下面到空行前的成员都是防类型检查报错临时添加的
    fireFetchData: Function;
    getDataModel: Function;
    getResolvedState: Function;
    getSortedData: Function;

    UNSAFE_componentWillMount() {
      // console.log('====Table componentWillMount');
      // this.setStateWithData(this.getDataModel(this.getResolvedState(), true))

      // 获取列表初始状态数据
      const resolvedState = this.getResolvedState();

      // 根据初始状态数据计算合并分组列和透视列数据，然后将计算出的数据与原初始数据属性合并一起再返回一个大对象
      const dataModel = this.getDataModel(resolvedState, true);

      // console.log('resolvedState, ', resolvedState);
      // console.log('dataModel, ', dataModel);

      // 根据新数据更新this.state
      this.setStateWithData(dataModel, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
      console.log('====Table componentWillReceiveProps');

      const oldState = this.getResolvedState();
      const newState = this.getResolvedState(nextProps, nextState);

      // Do a deep compare of new and old `defaultOption` and
      // if they are different reset `option = defaultOption`
      const defaultableOptions = ['sorted', 'filtered', 'resized', 'expanded'];
      defaultableOptions.forEach((x) => {
        const defaultName = `default${x.charAt(0).toUpperCase() + x.slice(1)}`;
        if (
          JSON.stringify(oldState[defaultName]) !==
          JSON.stringify(newState[defaultName])
        ) {
          newState[x] = newState[defaultName];
        }
      });

      // If they change these table options, we need to reset defaults
      // or else we could get into a state where the user has changed the UI
      // and then disabled the ability to change it back.
      // e.g. If `filterable` has changed, set `filtered = defaultFiltered`
      const resettableOptions = ['sortable', 'filterable', 'resizable'];
      resettableOptions.forEach((x) => {
        if (oldState[x] !== newState[x]) {
          const baseName = x.replace('able', '');
          const optionName = `${baseName}ed`;
          const defaultName = `default${
            optionName.charAt(0).toUpperCase() + optionName.slice(1)
          }`;
          newState[optionName] = newState[defaultName];
        }
      });

      // Props that trigger a data update
      if (
        oldState.data !== newState.data ||
        oldState.columns !== newState.columns ||
        oldState.pivotBy !== newState.pivotBy ||
        oldState.sorted !== newState.sorted ||
        oldState.filtered !== newState.filtered
      ) {
        this.setStateWithData(
          this.getDataModel(newState, oldState.data !== newState.data),
          undefined,
        );
      }
    }

    componentDidMount() {
      console.log('====Table componentDidMount');

      this.fireFetchData();
    }

    /**
     * 方法最后会调用this.setState，也会调用回调函数cb
     * @param newState 列表最新状态数据
     * @param cb 调用this.State()完成后会触发的回调函数
     */
    // eslint-disable-next-line complexity
    setStateWithData(newState, cb) {
      // 取旧数据
      const oldState = this.getResolvedState();

      // 取新数据，最后会被传到setState()
      const newResolvedState = this.getResolvedState({}, newState);

      const { freezeWhenExpanded } = newResolvedState;

      // Default to unfrozen state
      newResolvedState.frozen = false;

      // If freezeWhenExpanded is set, check for frozen conditions
      if (freezeWhenExpanded) {
        // if any rows are expanded, freeze the existing data and sorting
        const keys = Object.keys(newResolvedState.expanded);
        for (let i = 0; i < keys.length; i += 1) {
          if (newResolvedState.expanded[keys[i]]) {
            newResolvedState.frozen = true;
            break;
          }
        }
      }

      // If the data isn't frozen and either the data or
      // sorting model has changed, update the data
      if (
        (oldState.frozen && !newResolvedState.frozen) ||
        oldState.sorted !== newResolvedState.sorted ||
        oldState.filtered !== newResolvedState.filtered ||
        oldState.showFilters !== newResolvedState.showFilters ||
        (!newResolvedState.frozen &&
          oldState.resolvedData !== newResolvedState.resolvedData)
      ) {
        // Handle collapseOnsortedChange & collapseOnDataChange
        if (
          (oldState.sorted !== newResolvedState.sorted &&
            this.props.collapseOnSortingChange) ||
          oldState.filtered !== newResolvedState.filtered ||
          oldState.showFilters !== newResolvedState.showFilters ||
          (oldState.sortedData &&
            !newResolvedState.frozen &&
            oldState.resolvedData !== newResolvedState.resolvedData &&
            this.props.collapseOnDataChange)
        ) {
          newResolvedState.expanded = {};
        }

        Object.assign(newResolvedState, this.getSortedData(newResolvedState));
      }

      // Set page to 0 if filters change
      if (oldState.filtered !== newResolvedState.filtered) {
        newResolvedState.page = 0;
      }

      // Calculate pageSize all the time
      if (newResolvedState.sortedData) {
        newResolvedState.pages = newResolvedState.manual
          ? newResolvedState.pages
          : Math.ceil(
              newResolvedState.sortedData.length / newResolvedState.pageSize,
            );
        newResolvedState.page = newResolvedState.manual
          ? newResolvedState.page
          : Math.max(
              newResolvedState.page >= newResolvedState.pages
                ? newResolvedState.pages - 1
                : newResolvedState.page,
              0,
            );
      }

      return this.setState(newResolvedState, () => {
        if (cb) {
          cb();
        }

        // 这里的回调函数cb在Table componentDidMount调用完成后才会调用
        // console.log('====setStateWithData-after-cb');

        // 若当前页数、每页项数、排序字段数、过滤字段数发生了改变，则触发服务端相关的fireFetchData()
        if (
          oldState.page !== newResolvedState.page ||
          oldState.pageSize !== newResolvedState.pageSize ||
          oldState.sorted !== newResolvedState.sorted ||
          oldState.filtered !== newResolvedState.filtered
        ) {
          this.fireFetchData();
        }
      });
    }
  };

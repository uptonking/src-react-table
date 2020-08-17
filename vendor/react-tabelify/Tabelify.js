import React from 'react';
import createReactClass from 'create-react-class';
import GridHeader from './GridHeader';
import GridFooter from './GridFooter';
import GridRows from './GridRows';

/**
 * 基于flex实现的表格组件，cell的宽度由flex-basis/grow决定。
 * 受控组件类型的grid，只有form元素才有state
 */
const SmartGrid = createReactClass({
  getDefaultProps: function () {
    return {
      className: '',
      data: null,
      resultsPerPage: 10,
      currentPage: 1,
      sortColumn: '',
      sortDirection: '',
      forceRender: false,
      loading: false,
      layout: 'row',
      actionList: [],
      onActionClick: () => {},
      onHeaderClick: null,
      onFooterClick: null,
      showHeader: true,
      showFooter: true,
      selectedRows: {},
      elementId: null,
      transform: function (response, elementId) {
        return response.body.data;
      },
    };
  },
  getInitialState: function () {
    return {};
  },
  getOrderedColumns: function (columnMetadata) {
    return columnMetadata;
  },
  onChangeGrid: function (event, data) {
    data = data || {};
    this.props.onChangeGrid &&
      this.props.onChangeGrid(event, data, this.props.elementId);
  },
  sortDataOnColumn: function (data) {
    if (this.props.sortColumn === '') return data;
    // data.map((item, index) => {
    data.forEach((item, index) => {
      item['_index'] = index;
    });
    data.sort((a, b) => {
      if (this.props.sortDirection === 'ASC') {
        const num = a[this.props.sortColumn]
          .toString()
          .localeCompare(b[this.props.sortColumn].toString());
        if (num > 0) return 1;
        if (num < 0) return -1;
        if (a['_index'] > b['_index']) return 1;
        else return -1;
      } else {
        const num = b[this.props.sortColumn]
          .toString()
          .localeCompare(a[this.props.sortColumn].toString());
        if (num > 0) return 1;
        if (num < 0) return -1;
        console.log(a);
        console.log(b);
        console.log();
        if (a['_index'] > b['_index']) return 1;
        else return -1;
      }
    });
    return data;
  },
  getResponseData: function () {
    const startIndex = (this.props.currentPage - 1) * this.props.resultsPerPage;
    const endIndex = startIndex + this.props.resultsPerPage;
    let data = this.sortDataOnColumn(this.props.data);
    data = this.patternMatch(this.state.search, data);
    data = data.slice(startIndex, endIndex);
    return data;
  },
  patternMatch: function (text, data) {
    if (!text) {
      return data;
    }
    // eslint-disable-next-line no-unused-vars
    const that = this;
    const columnMetadata = this.props.columnMetadata;

    const filteredData = [];
    // data.map(row => {
    data.forEach(row => {
      let rowMatched = false;
      const columns = Object.keys(row);
      for (let i = 0; i < columns.length; i++) {
        if (columns[i] === '_index') continue;
        const columnValue = row[columns[i]];
        const formattedValue = columnMetadata[i].formatter
          ? columnMetadata[i].formatter(columnValue).toString()
          : columnValue.toString();
        if (
          typeof formattedValue === 'string' &&
          formattedValue.toLowerCase().indexOf(text.trim().toLowerCase()) !== -1
        ) {
          rowMatched = true;
          break;
        }
      }
      if (rowMatched === true) filteredData.push(row);
    });
    return filteredData;
  },
  searchHandler: function (event) {
    this.setState({
      search: event.target.value,
    });
  },

  render: function () {
    const data = this.props.data ? this.getResponseData() : null;
    if (
      this.props.data.length < this.props.resultsPerPage &&
      this.props.currentPage > 1
    ) {
      this.props.onChangeGrid(null, {
        currentPage: 1,
      });
    }
    const resultsOnPage =
      data && data.length <= this.props.resultsPerPage
        ? data.length
        : this.props.resultsPerPage;
    return (
      <div className='gridParent' style={this.props.style}>
        {this.props.localSearch ? (
          <input
            type='SmartInput'
            placeholder='search'
            value={this.state.search}
            className='grid-search'
            onChange={this.searchHandler}
          />
        ) : null}
        <div className='smartGridScroll'>
          <div
            className={'smartGrid ' + this.props.layout}
            style={{ width: this.props.width }}
          >
            <GridHeader
              {...this.props}
              className=''
              style={{}}
              onChangeGrid={this.onChangeGrid}
              resultsOnPage={resultsOnPage}
              data={data}
            />
            <GridRows
              {...this.props}
              className=''
              style={{}}
              onChangeGrid={this.onChangeGrid}
              resultsOnPage={resultsOnPage}
              data={data}
            />
          </div>
          <GridFooter
            {...this.props}
            className=''
            style={{}}
            currentPage={parseInt(this.props.currentPage)}
            totalCount={this.props.data.length}
            onChangeGrid={this.onChangeGrid}
            resultsOnPage={resultsOnPage}
          />
        </div>
      </div>
    );
  },
});

export default SmartGrid;

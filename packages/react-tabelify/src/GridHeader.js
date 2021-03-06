import React from 'react';
import createReactClass from 'create-react-class';
import DefaultHeader from './DefaultHeader';
/**
 * 在表头前显示一个checkbox
 */
const GridHeader = createReactClass({
  getDefaultProps: function () {
    return {
      columnMetadata: [],
      onHeaderClick: () => {},
    };
  },
  handleOnChange: function (event) {
    let selectedRows = this.props.selectedRows;
    if (!this.props.checkAll) {
      for (let i = 0; i < this.props.resultsOnPage; i++) {
        selectedRows[i] = {
          rowId: i,
          data: this.props.data[i],
        };
      }
    } else {
      selectedRows = {};
    }
    this.props.onChangeGrid(event, {
      checkAll: !this.props.checkAll,
      selectedRows: selectedRows,
      rerender: false,
    });
  },
  handleHeaderClick: function (data, event) {
    this.props.onHeaderClick && this.props.onHeaderClick(data, event);
  },
  render: function () {
    let Header;
    let headerContainerClass;
    if (this.props.customHeader) {
      Header = this.props.CustomHeader;
      headerContainerClass = 'customHeaderContainer';
    } else {
      Header = DefaultHeader;
      headerContainerClass = 'defaultHeaderContainer';
    }

    Header = this.props.CustomHeader ? this.props.CustomHeader : DefaultHeader;

    let headerContainer = (
      <div className='checkbox-wrapper'>
        {this.props.showCheckbox && (
          <input
            type='checkbox'
            className='checkboxContainer'
            checked={this.props.checkAll}
            value={this.props.checkAll}
            onClick={this.handleOnChange}
          />
        )}
        <Header {...this.props} onHeaderClick={this.handleHeaderClick} />
      </div>
    );

    let header = this.props.showHeader ? headerContainer : null;

    return (
      <div className={'headerContainer ' + headerContainerClass}>{header}</div>
    );
  },
});

// module.exports = GridHeader;
export default GridHeader;

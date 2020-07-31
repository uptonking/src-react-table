import React from 'react';
import DefaultRow from './DefaultRow';
import createReactClass from 'create-react-class';

let GridRow = createReactClass({
  handleOnChange: function (event) {
    let selectedRows = this.props.selectedRows;
    if (selectedRows[this.props.rowId]) {
      delete selectedRows[this.props.rowId];
    } else {
      selectedRows[this.props.rowId] = {
        rowId: this.props.rowId,
        data: this.props.data,
      };
    }
    this.props.onChangeGrid(event, {
      selectedRows: selectedRows,
    });
  },
  render: function () {
    let checked = this.props.selectedRows[this.props.rowId] ? true : false;
    let Row = this.props.CustomRow ? this.props.CustomRow : DefaultRow;
    return (
      <div
        className={
          'checkbox-wrapper ' +
          this.props.className +
          (checked ? ' checked' : '')
        }
      >
        {this.props.showCheckbox && (
          <input
            type='checkbox'
            className='checkboxContainer'
            checked={checked}
            onChange={this.handleOnChange}
          />
        )}
        <Row {...this.props} className='' style={{}} checked={checked} />
      </div>
    );
  },
});

module.exports = GridRow;

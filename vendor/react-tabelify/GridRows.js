import React from 'react';
import createReactClass from 'create-react-class';
import GridRow from './GridRow';

const GridRows = createReactClass({
  getDefaultProps: function () {
    return {
      data: [],
      columnMetadata: [],
      onRowClick: () => {},
      onChangeGrid: () => {},
    };
  },
  render: function () {
    let rowclassName = this.props.CustomRow
      ? 'customRowContainer'
      : 'defaultRowContainer';
    rowclassName += this.props.showCheckbox ? ' showCheck' : '';
    let rows = this.props.data.map((item, index) => {
      return (
        <GridRow
          {...this.props}
          rowId={index}
          data={item}
          key={index}
          className={rowclassName + ' row-' + index}
        />
      );
    });
    return (
      <div
        className={
          'gridRowsContainer' +
          (this.props.fixedHeight ? ' defaultScrollHeight' : '')
        }
        style={
          Number.isInteger(this.props.fixedHeight)
            ? {
                overflowY: 'scroll',
                height: this.props.fixedHeight,
              }
            : {}
        }
      >
        {rows}
      </div>
    );
  },
});

module.exports = GridRows;
export default GridRows;

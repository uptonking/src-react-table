import DefaultFooter from './DefaultFooter.js';
import React from 'react';
import createReactClass from 'create-react-class';

let GridFooter = createReactClass({
  onChangeGrid: function (event, data) {
    let newData = data;
    newData.selectedRows = {};
    this.props.onChangeGrid(event, newData);
  },
  getInitialState: function () {
    let totalPages = Math.ceil(
      this.props.numberOfEntries / this.props.resultsPerPage,
    );
    return {
      totalPages: totalPages,
    };
  },
  handleFooterClick: function (data, event) {
    this.props.onFooterClick && this.props.onFooterClick(data, event);
  },
  render: function () {
    let optionsArray = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      optionsArray.push(<option>{i}</option>);
    }
    let Footer = this.props.showFooter
      ? this.props.CustomFooter
        ? this.props.CustomFooter
        : DefaultFooter
      : null;

    return (
      <div>
        {Footer ? (
          <Footer
            {...this.props}
            onChangeGrid={this.onChangeGrid}
            onFooterClick={this.handleFooterClick}
          />
        ) : null}
      </div>
    );
  },
});

// module.exports = GridFooter;

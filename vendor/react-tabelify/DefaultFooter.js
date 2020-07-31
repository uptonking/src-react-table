import React from 'react';
import createReactClass from 'create-react-class';

let DefaultFooter = createReactClass({
  getInitialState: function () {
    let totalPages = this.computePage(
      this.props.totalCount,
      this.props.resultsPerPage,
    );
    return {
      totalPages: totalPages,
    };
  },
  componentWillReceiveProps: function (nextProps) {
    let totalPages = this.computePage(
      nextProps.totalCount,
      nextProps.resultsPerPage,
    );
    this.setState({
      totalPages: totalPages,
    });
  },
  handleOnChange: function (event) {
    let resultsPerPage = parseInt(event.target.value);
    this.props.onChangeGrid(null, {
      resultsPerPage: resultsPerPage,
      currentPage: 1,
    });
  },
  handleOnChangePage: function (event) {
    let currentPage = parseInt(event.target.value);
    this.props.onChangeGrid(null, {
      currentPage: currentPage,
    });
  },
  handleNextClick: function (event) {
    if (this.props.currentPage < this.state.totalPages) {
      this.props.onChangeGrid(event, {
        currentPage: this.props.currentPage + 1,
      });
    }
  },
  handlePreviousClick: function (event) {
    if (this.props.currentPage > 1) {
      this.props.onChangeGrid(event, {
        currentPage: this.props.currentPage - 1,
      });
    }
  },

  computePage: function (totalCount, resultsPerPage) {
    let totalPages = Math.floor(totalCount / resultsPerPage);
    if (totalCount % resultsPerPage !== 0) {
      totalPages++;
    }
    return totalPages;
  },
  render: function () {
    let optionsArray = [];
    let arr = [10, 20, 50, 100];
    for (var i = 0; i < arr.length; i++) {
      let selected = this.props.resultsPerPage === arr[i] ? true : false;
      optionsArray.push(
        <option value={arr[i]} selected={selected}>
          {arr[i]}
        </option>,
      );
    }
    let pageArr = [];
    for (
      // eslint-disable-next-line no-var
      var i = 1;
      i <= Math.ceil(this.props.totalCount / this.props.resultsPerPage);
      i++
    ) {
      let selected = this.props.currentPage === i ? true : false;
      pageArr.push(
        <option value={i} selected={selected}>
          {i}
        </option>,
      );
    }
    return (
      <div className='defaultFooter'>
        <div className='pagination pull-left'>
          Rows per page :{' '}
          <select onChange={this.handleOnChange}>{optionsArray}</select>{' '}
        </div>
        <div className='pagination pull-right'>
          <div style={{ display: 'inline-block' }}>
            {this.props.totalCount > 0 && this.props.resultsOnPage > 0
              ? (this.props.currentPage - 1) * this.props.resultsPerPage + 1
              : 0}
            &nbsp; to{' '}
            {(this.props.currentPage - 1) * this.props.resultsPerPage +
              this.props.resultsOnPage}
            &nbsp; of {this.props.totalCount} rows &nbsp;&nbsp;&nbsp;
          </div>
          <div style={{ display: 'inline-block' }}>
            <button
              className='btn previousButton'
              type='button'
              onClick={this.handlePreviousClick}
            >
              {'< Prev'}
            </button>

            <select onChange={this.handleOnChangePage}> {pageArr} </select>

            <button
              className='btn nextButton'
              type='button'
              onClick={this.handleNextClick}
            >
              {'> Next'}
            </button>
          </div>
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  },
});

module.exports = DefaultFooter;

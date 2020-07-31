import React from 'react';
import createReactClass from 'create-react-class';

const DefaultHeader = createReactClass({
  handleOnClick: function (event) {
    let sortColumn = event.currentTarget.getAttribute('data-column');
    let sortDirection = null;
    if (sortColumn === this.props.sortColumn) {
      if (this.props.sortDirection === 'ASC') sortDirection = 'DESC';
      else sortDirection = 'ASC';
    } else {
      sortDirection = 'ASC';
    }
    this.props.onChangeGrid(event, {
      sortColumn: event.currentTarget.getAttribute('data-column'),
      sortDirection: sortDirection,
    });
  },
  render: function () {
    let HeaderCells = this.props.columnMetadata.map(
      (columnMeta, columnIndex) => {
        let displayName = columnMeta.displayName;

        let sortIcon = null;

        if (columnMeta.columnName === this.props.sortColumn) {
          if (this.props.sortDirection === 'ASC') sortIcon = '▲';
          else if (this.props.sortDirection === 'DESC') sortIcon = '▼';
        }

        let style =
          columnMeta.flexBasis !== undefined
            ? { flexBasis: columnMeta.flexBasis, flexGrow: 0, flexShrink: 0 }
            : {};
        if (columnMeta.flexGrow !== undefined) {
          style.flexGrow = columnMeta.flexGrow;
        }

        style = Object.assign(style, columnMeta.style, columnMeta.headerStyle);

        return (
          <div
            data-column={columnMeta.columnName}
            title={columnMeta.toolTip || displayName}
            className={
              'defaultCell column-' +
              columnIndex +
              ' column-' +
              columnMeta.columnName +
              ' header-cell'
            }
            style={style}
            onClick={this.handleOnClick}
            key={columnIndex}
          >
            {displayName}
            <span style={{ position: 'relative' }}>{sortIcon}</span>
          </div>
        );
      },
    );

    return <div className='defaultRow header'>{HeaderCells}</div>;
  },
});

// module.exports = DefaultHeader;
export default DefaultHeader;

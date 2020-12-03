import React from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useFlexLayout,
  useResizeColumns,
  useExpanded,
} from '../../src/react-table';
import CustomInput from './CustomInput';

const rt7Expander = {
  // Make an expander cell
  Header: () => null, // No header
  id: 'expander', // It needs an ID
  width: 25,
  Cell: ({ row }) => (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <span {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? '▼' : '►'}
    </span>
  ),
};
window.Date.prototype.isValid = function () {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  // eslint-disable-next-line
  return this.getTime() === this.getTime();
};

// value and onChange function
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  console.log(setGlobalFilter, 'global filter');
  return (
    <CustomInput
      value={globalFilter || ''}
      onChange={(e) => {
        setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder='Search All ...'
    />
  );
};

const ColumnFilter = ({ column: { filterValue, setFilter, filter } }) => {
  return (
    <CustomInput
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${filter ? filter : ''}...`}
    />
  );
};

/**
 * As in the previous versions, any react table needs colums where at the core we have a field Header, and accessor
 * As in the previous versions, a react table has data that consist of an array of JSONs
 */
// function to render the subcomponent as a props
const ReactTable = ({ columns, data, renderRowSubComponent }) => {
  // adding the expander to the columns
  columns = [rt7Expander, ...columns];
  // functions to run when a column is filtered depending on the type
  const filterTypes = {
    year: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined &&
          Number(filterValue) &&
          new Date(rowValue) &&
          new Date(rowValue).isValid()
          ? new Date(rowValue).getFullYear() === Number(filterValue)
          : true;
      });
    },
    text: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    },
  };
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter,
      // column sizes in the default column
      minWidth: 10,
      maxWidth: 400,
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    // hooks for filters
    useFilters,
    useGlobalFilter,
    // hook for sorting
    useSortBy,
    // hooks for resizing
    useFlexLayout,
    useResizeColumns,
    // hooks for exander,
    useExpanded,
  );
  return (
    <div>
      <div className='p-1 border-0 d-flex justify-content-end'>
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className='table' {...getTableProps()}>
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className='tr'>
              {headerGroup.headers.map((column, i) => {
                // three new addition to column: isSorted, isSortedDesc, getSortByToggleProps
                const {
                  render,
                  getHeaderProps,
                  isSorted,
                  isSortedDesc,
                  getSortByToggleProps,
                  // filter,
                  canFilter,
                  // resizer
                  isResizing,
                  getResizerProps,
                } = column;
                const extraClass = isSorted
                  ? isSortedDesc
                    ? 'desc'
                    : 'asc'
                  : '';
                const { onClick, ...rest } = getHeaderProps(
                  getSortByToggleProps(),
                );
                return (
                  <div
                    key={`th-${i}`}
                    className={`${extraClass} th`}
                    {...rest}
                    // getHeaderProps now receives a function
                  >
                    <div onClick={onClick}>{render('Header')}</div>
                    {/* resizer div */}
                    <div
                      {...getResizerProps()}
                      className={`resizer ${isResizing ? 'isResizing' : ''}`}
                    />
                    {/* Render the columns filter UI */}
                    <div>{canFilter ? render('Filter') : null}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            // use a frament so that we can render two divs inside
            return (
              <React.Fragment key={`rt-tb-trs${i}`}>
                <div className='tr' {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()} className='td'>
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
                {row.isExpanded ? (
                  <div className='tr'>
                    <div>
                      {/*
                        Inside it, call our renderRowSubComponent function. In reality,
                        you could pass whatever you want as props to
                        a component like this, including the entire
                        table instance. But for this example, we'll just
                        pass the row
                      */}
                      {renderRowSubComponent({ row })}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReactTable;

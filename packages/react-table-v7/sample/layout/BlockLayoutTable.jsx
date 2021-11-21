import React from 'react';
import styled from 'styled-components';
import { useTable, useBlockLayout } from '../../src/react-table';

import makeData from '../simple/makeData';

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    /* 设置表头行单元格和数据行单元格的样式 */
    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    .th {
      font-weight: bold;
    }
  }
`;

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      // width: 150,
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout,
    );

  return (
    <div {...getTableProps()} className='table'>
      <div>
        {headerGroups.map((headerGroup, index) => (
          <div
            {...headerGroup.getHeaderGroupProps()}
            className='tr'
            key={index}
          >
            {headerGroup.headers.map((column, i) => (
              <div {...column.getHeaderProps()} className='th' key={i}>
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className='tr' key={i}>
              {row.cells.map((cell, index) => {
                return (
                  <div {...cell.getCellProps()} className='td' key={index}>
                    {cell.render('Cell')}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BlockLayoutTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            width: 50,
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            width: 60,
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    [],
  );

  const data = React.useMemo(() => makeData(20), []);

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default BlockLayoutTable;

import React from 'react';
import { useTable } from '../../src/react-table';

function App() {
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column-2',
        accessor: 'col2',
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data });
  console.log('==tableInstance,', tableInstance);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance;

  // 最重要的任务是处理headerGroups和rows
  return (
    // apply the table props
    <table
      {...getTableProps()}
      style={{
        border: 'solid 2px teal',
        // borderCollapse: 'collapse'
      }}
    >
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup, index) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, i) => (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      border: 'solid 1px blue',
                      background: 'aliceblue',
                    }}
                    key={i}
                  >
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row, index) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()} key={index}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, i) => {
                    // Apply the cell props
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px silver',
                          background: 'snow',
                        }}
                        key={i}
                      >
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default App;

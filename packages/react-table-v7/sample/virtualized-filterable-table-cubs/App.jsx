import './styles.css';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Button from './components/Button';
import IconButton from './components/IconButton';
import Input from './components/Input';
import Progress from './components/Progress';
import Table from './components/Table';
import makeData from './makeData';
import theme from './theme';
import { formatCurrency } from './utils';

const StyledProgress = styled(Progress)`
  margin-top: 8px;
`;

const ToggleHeight = ({ rerender }) => {
  const [on, setOn] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      rerender(200);
    } else {
      isMounted.current = true;
    }
  }, [on, rerender]);

  return (
    <div
      style={{
        width: 50,
        height: on ? 100 : 32,
        background: on ? 'green' : 'red',
        transition: '200ms',
      }}
      onClick={() => setOn((val) => !val)}
    >
      {on ? 'on' : 'off'}
    </div>
  );
};

// TODO: Find a way to automate the state and data handling here
// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (value !== initialValue) updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input value={value} onChange={onChange} onBlur={onBlur} />;
};

const rowCount = 500;

/**
 * * 基于react-table和react-virtual实现的virtualized, filterable, selectable table。
 */
export function CubsApp() {
  const mockData = useMemo(() => makeData(rowCount), []);

  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [originalData] = useState(mockData);
  const [skipRerenderOnDataChange, setSkipRerenderOnDataChange] =
    useState(false);
  const [hasData, setHasData] = useState(false);
  const [tableFilters, setTableFilters] = useState([]);
  const [tableSortBy, setTableSortBy] = useState();
  const [tableSelectedRowIds, setTableSelectedRowIds] = useState();

  useEffect(() => {
    setTimeout(() => {
      setHasData(true);
    }, 1000);
  }, [data]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipRerenderOnDataChange(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipRerenderOnDataChange(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <ThemeProvider theme={theme}>
      <Table
        debug
        collapsible
        renderHeaderIconButton={() => <IconButton type='magnifying-glass' />}
        title='全功能表格Things'
        data={hasData ? data : []}
        updateData={updateData}
        onRefreshData={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setData(makeData(rowCount));
          }, 1000);
        }}
        skipRerenderOnDataChange={skipRerenderOnDataChange}
        filters={tableFilters}
        onFilter={useCallback(
          (filters) => setTableFilters(filters),
          [setTableFilters],
        )}
        sortBy={tableSortBy}
        onSort={useCallback(
          (sortBy) => setTableSortBy(sortBy),
          [setTableSortBy],
        )}
        defaultSortBy={[{ id: 'firstName', desc: false }]}
        rowSelection
        isRowSelectable={(row) => Number(row.original?.age || 0) > 12}
        selectedRowIds={tableSelectedRowIds}
        onSelect={useCallback((selectedRows) => {
          console.log(selectedRows);
          setTableSelectedRowIds(selectedRows.map((row) => row.id));
        }, [])}
        detailRow={({ row, rerender }) => (
          <>
            <div style={{ textAlign: 'center' }}>
              <h3>Row {row.index}</h3>
            </div>
          </>
        )}
        loading={loading || !hasData}
        onReset={resetData}
        actions={[
          {
            id: 'calendar',
            icon: 'calendar',
            label: 'Date',
            onClick: () => {
              setTableSelectedRowIds([data[0].id, data[1].id]);
              setTimeout(() => {
                setTableFilters([
                  {
                    id: 'firstName',
                    value: ['notContains', 'a', 'and', 'contains', 'b'],
                  },
                ]);
                setTableSortBy([
                  {
                    id: 'firstName',
                    desc: false,
                  },
                ]);
              });
            },
          },
        ]}
        renderPrimaryActions={() => (
          <Button
            iconType='plus'
            size='small'
            color='primary'
            variant='contained'
          >
            Add New
          </Button>
        )}
        defaultColumn={useMemo(
          () => ({
            filters: false,
            // hideMenu: true
          }),
          [],
        )}
        columns={useMemo(
          () => [
            {
              id: 'rowIndex',
              Header: 'Row Index',
              accessor: (row, i) => i,
              width: 50,
              sort: 'asc',
              filter: 'number',
            },
            {
              Header: 'ID',
              accessor: 'id',
              hidden: true,
            },
            // {
            //   id: "toggleHeight",
            //   Header: "Toggle",
            //   Cell: ToggleHeight,
            //   hidden: true
            // },
            {
              id: 'name',
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                  Cell: ({ value }) => (
                    <a
                      href='http://google.com/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {value}
                    </a>
                  ),
                  defaultFiterValue: ['contains', 'Austin'],
                },
                {
                  Header: 'Last Name',
                  accessor: 'lastName',
                },
                {
                  Header: 'Nick Name',
                  accessor: 'nickName',
                  Cell: EditableCell,
                },
              ],
            },
            {
              id: 'info',
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age',
                  width: 50,
                  filter: 'number',
                  PinnedBottomCell: ({ rows }) => {
                    const avgAmount = Math.floor(
                      rows.reduce((acc, row) => {
                        const value = Number(row.values['age']);

                        return acc + (value ?? 0);
                      }, 0) / rows.length,
                    );

                    return (
                      <div>
                        <div>Avg</div>
                        <div>
                          <strong>{avgAmount}</strong>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  Header: 'Birthday',
                  accessor: 'birthday',
                  type: 'date',
                },
                {
                  Header: 'Visits',
                  accessor: 'visits',
                  width: 50,
                  filter: 'number',
                  PinnedTopCell: ({ rows }) => {
                    const totalAmount = rows.reduce((acc, row) => {
                      const value = Number(row.values['visits']);

                      return acc + (value ?? 0);
                    }, 0);

                    return (
                      <div>
                        <div>Total</div>
                        <div>
                          <strong>{totalAmount}</strong>
                        </div>
                      </div>
                    );
                  },
                  PinnedBottomCell: ({ rows }) => {
                    const totalAmount = rows.reduce((acc, row) => {
                      const value = Number(row.values['visits']);

                      return acc + (value ?? 0);
                    }, 0);

                    return (
                      <div>
                        <div>Total</div>
                        <div>
                          <strong>{totalAmount}</strong>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  Header: 'Status',
                  accessor: 'status',
                  filter: 'set',
                  Cell: ({ value }) => (
                    <div>
                      {value === 'single'
                        ? '💖'
                        : value === 'complicated'
                        ? '❤️‍🩹'
                        : value === 'divorced'
                        ? '💔'
                        : '❤️'}{' '}
                      {value}
                    </div>
                  ),
                },
                {
                  Header: 'Profile Progress',
                  accessor: 'progress',
                  align: 'end',
                  filter: 'number',
                  Cell: ({ value }) => (
                    <StyledProgress
                      value={Number(value || 0) / 100}
                      description={Number(value || 0) < 25 ? 'Needs work' : ''}
                      color={Number(value || 0) < 25 ? 'danger' : undefined}
                    />
                  ),
                },
              ],
            },
            {
              id: 'bankAccount',
              Header: 'Bank Account',
              columns: [
                {
                  Header: 'Account #',
                  accessor: 'bankAccount.account',
                },
                {
                  Header: 'Type',
                  accessor: 'bankAccount.type',
                  filter: 'set',
                  hidden: true,
                },
                {
                  Header: 'Balance',
                  accessor: 'bankAccount.balance',
                  type: 'currency',
                  pinned: 'right',
                  PinnedTopCell: ({ rows, filteredRows }) => {
                    const totalAmount = rows.reduce((acc, row) => {
                      const value = Number(row.values['bankAccount.balance']);

                      return acc + (value ?? 0);
                    }, 0);

                    return (
                      <div>
                        <div>Top Total</div>
                        <div>
                          <strong>{formatCurrency(totalAmount)}</strong>
                        </div>
                      </div>
                    );
                  },
                  PinnedBottomCell: ({ rows, filteredRows }) => {
                    const totalAmount = rows.reduce((acc, row) => {
                      const value = Number(row.values['bankAccount.balance']);

                      return acc + (value ?? 0);
                    }, 0);

                    return (
                      <div>
                        <div>Bottom Total</div>
                        <div>
                          <strong>{formatCurrency(totalAmount)}</strong>
                        </div>
                      </div>
                    );
                  },
                },
              ],
            },
          ],
          [],
        )}
      />
    </ThemeProvider>
  );
}

export default CubsApp;

import { useTable } from '../../core/useTable';
import { renderHook } from '@testing-library/react-hooks';
import { getHeaderIds, getRowValues } from '../../../test-utils';
import { withCore } from '../withCore';
import { withTest } from '../withTest';

const data = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 29,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'derek',
    lastName: 'perkins',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'bergevin',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columns = [
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
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
];

describe('useTable', () => {
  it('renders a basic table', () => {
    const { result } = renderHook(() => {
      const instance = useTable(
        {
          data,
          columns,
        },
        [withCore, withTest],
      );

      return instance;
    });

    expect(getHeaderIds(result.current)).toEqual([
      ['Name', 'Info'],
      ['firstName', 'lastName', 'age', 'visits', 'status', 'progress'],
    ]);

    expect(getRowValues(result.current)).toEqual([
      ['tanner', 'linsley', 29, 100, 'In Relationship', 50],
      ['derek', 'perkins', 40, 40, 'Single', 80],
      ['joe', 'bergevin', 45, 20, 'Complicated', 10],
    ]);

    expect(result.current.getTableBodyProps({ custom: true })).toEqual({
      role: 'rowgroup',
    });

    expect(
      result.current.flatHeaders[0].getHeaderProps({ custom: true }),
    ).toEqual({});
  });
});

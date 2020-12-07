import React from 'react';
import { makeData } from './util/mockDataUtil';
import ReactTable from '..';
import '../style/index.css';

export class SimpleRTableApp extends React.Component<any, any> {
  constructor(props) {
    super(props);

    const arrMockData = makeData(13);
    console.log('====constructor-arrMockData, ', arrMockData);

    this.state = {
      data: arrMockData,
    };
  }
  render() {
    const { data } = this.state;
    const pColumns = [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            id: 'lastName',
            accessor: d => d.lastName,
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
            Header: 'Status',
            accessor: 'status',
          },
        ],
      },
      {
        Header: 'Stats',
        columns: [
          {
            Header: 'Visits',
            accessor: 'visits',
          },
        ],
      },
    ];
    return (
      <div>
        <h2> simple-react-table-v6 </h2>
        <ReactTable data={data} columns={pColumns} defaultPageSize={5} className='-striped -highlight' />
      </div>
    );
  }
}

import _ from 'lodash';
import React from 'react';

import { SmartGrid as Tabelify } from '@examples-hub/react-tabelify';

const data = [
  {
    cgpa: 5.2,
    name: 'Rishabh',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.9,
    name: 'Suyash',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.4,
    name: 'Tanuj',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 9.7,
    name: 'Karan',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.2,
    name: 'Harsh',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 4.2,
    name: 'Sanchit',
    discipline: 'Mathematics',
    university: 'BITS Pilani',
    year: 'fifth',
  },
  {
    cgpa: 7.9,
    name: 'Rahul',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.1,
    name: 'Ram',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 8.9,
    name: 'Rohan',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 3.9,
    name: 'Karshit',
    discipline: 'IT',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 4.9,
    name: 'Amitesh',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 9.0,
    name: 'Ayush',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 5.0,
    name: 'Sullu',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.6,
    name: 'Dhruv Suri',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.3,
    name: 'Shan Balasubraniam',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 9.2,
    name: 'Punit',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 8.5,
    name: 'Prerak',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 8.7,
    name: 'Anand Mishra',
    discipline: 'Computer Science',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.6,
    name: 'Rakesh',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 5.9,
    name: 'Roshan',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 2.9,
    name: 'Shah Rukh',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.4,
    name: 'Anmol',
    discipline: 'Physics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 7.5,
    name: 'Rishi',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 6.9,
    name: 'GKB',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 4.9,
    name: 'Ramu',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 5.4,
    name: 'Rishikesh',
    discipline: 'Electrical and Electronics',
    university: 'BITS Pilani',
    year: 'fourth',
  },
  {
    cgpa: 4.7,
    name: 'Sharma',
    discipline: 'Information Systems',
    university: 'BITS Pilani',
    year: 'fourth',
  },
];

const columnMetadata = [
  {
    columnName: 'cgpa',
    displayName: 'CGPA',
  },
  {
    columnName: 'name',
    displayName: 'Name',
  },
  {
    columnName: 'university',
    displayName: 'University',
  },
  {
    columnName: 'discipline',
    displayName: 'Discipline',
  },
  {
    columnName: 'year',
    displayName: 'Year',
    // render:()=>{
    //     return <div style={{backgroundColor:'lightblue'}}>"Custom Column"</div>
    // },
    // "flexBasis":'190px'
  },
];

/**
 * 完全受控的表格组件
 */
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeGrid = this.onChangeGrid.bind(this);

    this.state = {
      /** 表格唯一的数据源，会在onChangeGrid中更新 */
      tableConfig: {
        data: data,
        /** 自定义列信息，通过render属性指定列组件 */
        columnMetadata: columnMetadata,
        /** grid所有的change事件都会通过这个callback修改数据 */
        onChangeGrid: this.onChangeGrid,
        resultsPerPage: 6,
        currentPage: 1,
        showCheckbox: true,
        onRowClick: this.onRowClick,
        selectedRows: {},
        /** 自定义行组件 */
        // CustomRow: require('./CustomRow.js')
        // CustomHeader: require('./CustomHeader')
        // showHeader:false,
        // showFooter: false
        localSearch: true,
        // fixedHeight:100,
        // width: '1000px'
      },
    };
  }

  onChangeGrid(event, data) {
    const tableConfig = this.state.tableConfig;
    // 用新的data数组更新config对象
    _.extend(tableConfig, data);
    this.setState({
      tableConfig: tableConfig,
    });
  }

  render() {
    return (
      <div>
        <Tabelify style={{ margin: '16px' }} {...this.state.tableConfig} />
      </div>
    );
  }
}

import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  /* Zebra striping */
  tr:nth-of-type(odd) {
    background: #eee;
  }
  th {
    background: #333;
    color: white;
    font-weight: bold;
  }
  td,
  th {
    padding: 6px;
    border: 1px solid #ccc;
    text-align: left;
  }
`;

// 移动端每单元格显示成一行
const StyledDiv1 = styled('div')`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  /* Zebra striping */
  tr:nth-of-type(odd) {
    background: #eee;
  }
  th {
    background: #333;
    color: white;
    font-weight: bold;
  }
  td,
  th {
    padding: 6px;
    border: 1px solid #ccc;
    text-align: left;
  }

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    /* Force table to not be like tables anymore */
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      border: 1px solid #ccc;
    }

    td {
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }
    td:before {
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      top: 6px;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
    }

    td:nth-of-type(1):before {
      content: 'First Name';
    }
    td:nth-of-type(2):before {
      content: 'Last Name';
    }
    td:nth-of-type(3):before {
      content: 'Job Title';
    }
    td:nth-of-type(4):before {
      content: 'Favorite Color';
    }
    td:nth-of-type(5):before {
      content: 'Wars of Trek?';
    }
    td:nth-of-type(6):before {
      content: 'Secret Alias';
    }
    td:nth-of-type(7):before {
      content: 'Date of Birth';
    }
    td:nth-of-type(8):before {
      content: 'Dream Vacation City';
    }
    td:nth-of-type(9):before {
      content: 'GPA';
    }
    td:nth-of-type(10):before {
      content: 'Arbitrary Data';
    }
  }
`;

function HtmlTablePlainOld(props) {
  return (
    <StyledDiv>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>James</td>
            <td>Matman</td>
            <td>Chief Sandwich Eater</td>
          </tr>
          <tr>
            <td>The</td>
            <td>Tick</td>
            <td>Crimefighter Sorta</td>
          </tr>

          <tr>
            <td>The</td>
            <td>Tick</td>
            <td>Crimefighter Sorta</td>
          </tr>
        </tbody>
      </table>
    </StyledDiv>
  );
}

export default HtmlTablePlainOld;

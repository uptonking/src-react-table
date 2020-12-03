import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  .rtable {
    margin: 0;
    padding: 25px;
    color: #494b4d;
    font-size: 14px;
    font-family: sans-serif;
    line-height: 20px;
    /*!
  // IE needs inline-block to position scrolling shadows otherwise use:
  // display: block;
  // max-width: min-content;
  */
    display: inline-block;
    vertical-align: top;
    max-width: 100%;

    overflow-x: auto;

    // optional - looks better for small cell values
    white-space: nowrap;

    border-collapse: collapse;
    border-spacing: 0;
  }

  .rtable,
  .rtable--flip tbody {
    // optional - enable iOS momentum scrolling
    -webkit-overflow-scrolling: touch;

    // scrolling shadows
    background: radial-gradient(
          left,
          ellipse,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0) 75%
        )
        0 center,
      radial-gradient(
          right,
          ellipse,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0) 75%
        )
        100% center;
    background-size: 10px 100%, 10px 100%;
    background-attachment: scroll, scroll;
    background-repeat: no-repeat;
  }

  // change these gradients from white to your background colour if it differs
  // gradient on the first cells to hide the left shadow
  .rtable td:first-child,
  .rtable--flip tbody tr:first-child {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-repeat: no-repeat;
    background-size: 20px 100%;
  }

  // gradient on the last cells to hide the right shadow
  .rtable td:last-child,
  .rtable--flip tbody tr:last-child {
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-repeat: no-repeat;
    background-position: 100% 0;
    background-size: 20px 100%;
  }

  .rtable th {
    font-size: 11px;
    text-align: left;
    text-transform: uppercase;
    background: #f2f0e6;
  }

  .rtable th,
  .rtable td {
    padding: 6px 12px;
    border: 1px solid #d9d7ce;
  }

  .rtable--flip {
    display: flex;
    overflow: hidden;
    background: none;
  }

  .rtable--flip thead {
    display: flex;
    flex-shrink: 0;
    min-width: min-content;
  }

  .rtable--flip tbody {
    display: flex;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .rtable--flip tr {
    display: flex;
    flex-direction: column;
    min-width: min-content;
    flex-shrink: 0;
  }

  .rtable--flip td,
  .rtable--flip th {
    display: block;
  }

  .rtable--flip td {
    background-image: none !important;
    // border-collapse is no longer active
    border-left: 0;
  }

  // border-collapse is no longer active
  .rtable--flip th:not(:last-child),
  .rtable--flip td:not(:last-child) {
    border-bottom: 0;
  }

  // CodePen house keeping

  body {
    margin: 0;
    padding: 25px;
    color: #494b4d;
    font-size: 14px;
    line-height: 20px;
  }

  h1,
  h2,
  h3 {
    margin: 0 0 10px 0;
    color: #1d97bf;
  }

  h1 {
    font-size: 25px;
    line-height: 30px;
  }

  h2 {
    font-size: 20px;
    line-height: 25px;
  }

  h3 {
    font-size: 16px;
    line-height: 20px;
  }

  table {
    margin-bottom: 30px;
  }

  a {
    color: #ff6680;
  }

  code {
    background: #fffbcc;
    font-size: 12px;
  }
`;

function HtmlTable(props) {
  return (
    <StyledDiv>
      <h2>Basic overflow:</h2>
      <table className='rtable'>
        <thead>
          <tr>
            <th>Browser</th>
            <th>Sessions</th>
            <th>Percentage</th>
            <th>New Users</th>
            <th>Avg. Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chrome</td>
            <td>9,562</td>
            <td>68.81%</td>
            <td>7,895</td>
            <td>01:07</td>
          </tr>
          <tr>
            <td>Firefox</td>
            <td>2,403</td>
            <td>17.29%</td>
            <td>2,046</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Safari</td>
            <td>1,089</td>
            <td>2.63%</td>
            <td>904</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Internet Explorer</td>
            <td>366</td>
            <td>2.63%</td>
            <td>333</td>
            <td>01:01</td>
          </tr>
          <tr>
            <td>Safari (in-app)</td>
            <td>162</td>
            <td>1.17%</td>
            <td>112</td>
            <td>00:58</td>
          </tr>
          <tr>
            <td>Opera</td>
            <td>103</td>
            <td>0.74%</td>
            <td>87</td>
            <td>01:22</td>
          </tr>
          <tr>
            <td>Edge</td>
            <td>98</td>
            <td>0.71%</td>
            <td>69</td>
            <td>01:18</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>275</td>
            <td>6.02%</td>
            <td>90</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>

      <h2>Flipped axis and overflow:</h2>

      <table className='rtable rtable--flip'>
        <thead>
          <tr>
            <th>Browser</th>
            <th>Sessions</th>
            <th>Percentage</th>
            <th>New Users</th>
            <th>Avg. Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chrome</td>
            <td>9,562</td>
            <td>68.81%</td>
            <td>7,895</td>
            <td>01:07</td>
          </tr>
          <tr>
            <td>Firefox</td>
            <td>2,403</td>
            <td>17.29%</td>
            <td>2,046</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Safari</td>
            <td>1,089</td>
            <td>2.63%</td>
            <td>904</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Internet Explorer</td>
            <td>366</td>
            <td>2.63%</td>
            <td>333</td>
            <td>01:01</td>
          </tr>
          <tr>
            <td>Safari (in-app)</td>
            <td>162</td>
            <td>1.17%</td>
            <td>112</td>
            <td>00:58</td>
          </tr>
          <tr>
            <td>Opera</td>
            <td>103</td>
            <td>0.74%</td>
            <td>87</td>
            <td>01:22</td>
          </tr>
          <tr>
            <td>Edge</td>
            <td>98</td>
            <td>0.71%</td>
            <td>69</td>
            <td>01:18</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>275</td>
            <td>6.02%</td>
            <td>90</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    </StyledDiv>
  );
}

export default HtmlTable;

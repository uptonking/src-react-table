import React from 'react';

function HtmlTable(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>标题1</th>
            <th>title 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>a11</td>
            <td>a12</td>
          </tr>
          <tr>
            <td>a21</td>
            <td>a22</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HtmlTable;

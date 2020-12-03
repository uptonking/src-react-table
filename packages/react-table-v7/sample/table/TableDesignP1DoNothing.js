import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  main {
    display: flex;
    justify-content: center;
  }

  table {
    max-width: 100%;
  }

  /* 奇数行使用灰色背景，形成条纹，下面表头选择器再修改表头色 */
  tr:nth-child(odd) {
    background-color: #eee;
  }

  th {
    background-color: #555;
    color: #fff;
  }

  th,
  td {
    text-align: left;
    padding: 0.5em 1em;
  }
`;

/**
 * DO NOTHING for table. css only.
 * 适用于列少行多的数据，最简单的表格。
 */
function TableDesignP1DoNothing(props) {
  return (
    <StyledDiv>
      <main>
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Profession</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ye Zhetai</td>
              <td>Physicist</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Shao Lin</td>
              <td>Physicist</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Ye Wenjie</td>
              <td>Astrophysicist</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Ye Wenxue</td>
              <td>Student</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Lei Zhicheng</td>
              <td>Political commissar</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Yang Weining</td>
              <td>Chief engineer</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Wang Miao</td>
              <td>Nanomaterials researcher</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Yang Dong</td>
              <td>String theorist</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Ding Yi</td>
              <td>Theoretical physicist</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Shi Qiang</td>
              <td>Police detective</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Chang Weisi</td>
              <td>Major-general</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Shen Yufei</td>
              <td>Physicist</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Wei Cheng</td>
              <td>Math prodigy</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Pan Han</td>
              <td>Biologist</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Sha Ruishan</td>
              <td>Astronomer</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Mike Evans</td>
              <td>Oil magnate heir</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Colonel Stanton</td>
              <td>Marine</td>
              <td>Male</td>
            </tr>
          </tbody>
        </table>
      </main>
    </StyledDiv>
  );
}

export default TableDesignP1DoNothing;

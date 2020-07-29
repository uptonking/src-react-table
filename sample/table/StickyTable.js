import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  .table-wrapper {
    max-width: 480px;
    max-height: 640px;
    overflow: scroll;
  }

  table {
    position: relative;
    border: 1px solid #ddd;
    border-collapse: collapse;
  }

  td,
  th {
    white-space: nowrap;
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;
  }

  /* sticky所有th，也就是表头行的所有单元格 */
  th {
    position: sticky;
    top: -1px;
    z-index: 2;
    background-color: #eee;

    /* 第一个单元格突出z-index */
    &:first-of-type {
      left: -1px;
      z-index: 3;
    }
  }

  /* 装饰每行第一个单元格，也就是第一列 */
  tbody tr td:first-of-type {
    position: sticky;
    left: -1px;
    text-align: left;
    background-color: #eee;
    /* border: 1px solid #000; */
  }
`;

/**
 * 使用position sticky固定表头行列. css only.
 * 缺点: firefox的bug，表头行及第一列的单元格都无边框
 * It’s totally valid (and encouraged where appropriate) to use a <th> in <tbody>.
 * It’s good for cells that label the row, such as the first column of your examples
 */
function SickyTable(props) {
  return (
    <StyledDiv>
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th />
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>F</th>
              <th>G</th>
              <th>H</th>
              <th>I</th>
              <th>J</th>
              <th>K</th>
              <th>L</th>
              <th>M</th>
              <th>N</th>
              <th>O</th>
              <th>P</th>
              <th>Q</th>
              <th>R</th>
              <th>S</th>
              <th>T</th>
              <th>U</th>
              <th>V</th>
              <th>W</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anna</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>James</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Jennifer</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Jeremiah</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Jocelyn</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Benjamin</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zed</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Frank</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
            </tr>
            <tr>
              <td>Chris</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
            </tr>
            <tr>
              <td>Sarah</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Rob</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
            </tr>
            <tr>
              <td>Danielle</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
            </tr>
            <tr>
              <td>Jessica</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
              <td>13</td>
            </tr>
          </tbody>
        </table>
      </div>
    </StyledDiv>
  );
}

export default SickyTable;

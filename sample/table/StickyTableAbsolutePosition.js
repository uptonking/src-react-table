import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  .table-wrapper {
    max-width: 640px;
    max-height: 480px;
  }

  table {
    width: 100%;
    max-width: 100%;
  }

  td,
  th {
    white-space: nowrap;
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;
  }

  tbody tr td:first-of-type {
    position: absolute;
    top: auto;
    left: 0;
    width: 200px;
    padding-left: 0;
    padding-right: 0;
  }

  .table-list-col-sticky {
    padding-left: 200px;
    position: relative;
  }

  .table-list-col-sticky .table-list-overflow {
    left: 200px;
  }
  .table-list-overflow {
    overflow-y: auto;
    overflow-x: auto;
    border-left: 1px solid #ddd;
  }
  .table-list-responsive {
    border: 1px solid #dddddd;
    margin-bottom: 15px;
    background: #fff;
    display: table-cell;
    width: 100%;
  }
  .table-list-responsive table {
    table-layout: fixed;
    margin-bottom: 0;
    border-collapse: separate;
  }
`;

/**
 * 使用position sticky固定表头行列. css only.
 */
function StickyTableAbsolutePosition(props) {
  return (
    <StyledDiv>
      <div className='table-wrapper'>
        <div className='table-list-col-sticky'>
          <div className='table-list-overflow'>
            <div className='table-list-responsive'>
              <table className='table-list'>
                <colgroup>
                  <col style={{ width: 0 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                </colgroup>
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
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

export default StickyTableAbsolutePosition;

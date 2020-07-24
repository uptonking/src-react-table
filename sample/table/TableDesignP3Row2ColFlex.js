import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  main {
    padding: 1em;
  }

  tr {
    border-bottom: 1px solid;
  }

  th {
    background-color: #555;
    color: #fff;
    white-space: nowrap;
  }

  th,
  td {
    text-align: left;
    padding: 0.5em 1em;
    white-space: nowrap;
  }

  @media screen and (max-width: 1140px) {
    table {
      display: flex;
    }

    tbody {
      display: flex;
      position: relative;
      overflow-x: auto;
      overflow-y: hidden;

      max-width: 100%;
      background: linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
        linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 0 100%,
        radial-gradient(
          farthest-side at 0% 50%,
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0)
        ),
        radial-gradient(
            farthest-side at 100% 50%,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0)
          )
          0 100%;
      background-repeat: no-repeat;
      background-color: white;
      background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
      background-position: 0 0, 100%, 0 0, 100%;
      background-attachment: local, local, scroll, scroll;
    }

    th,
    td {
      display: block;
    }

    td {
      border-bottom: 1px solid;
    }

    .numeric {
      text-align: right;
    }

    .text {
      text-align: center;
    }
  }

  p {
    text-align: right;
    margin-top: 1em;
    font-style: italic;
  }
`;

/**
 * 行列互换，表头列在最左边固定，只滚动右边的数据列。
 * 示例中包含emoji表情文本，表情符号高度不同会导致单元格下划线有起伏。
 */
function TableDesignP3Row2ColFlex(props) {
  return (
    <StyledDiv>
      <main>
        <div className='table-wrapper' tabIndex='0'>
          <table>
            <thead>
              <tr>
                <th>Drink</th>
                <th>Emoji</th>
                <th>Calories</th>
                <th>Carbohydrates (g)</th>
                <th>Total Sugar (g)</th>
                <th>Protein (g)</th>
                <th>Total Fat (g)</th>
                <th>Total Fiber (g)</th>
                <th>Cholesterol (mg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text'>milk</td>
                {/* <td className='text'>emoji icon</td> */}
                <td className='text'>🥛</td>
                <td className='numeric'>149.0</td>
                <td className='numeric'>11.7</td>
                <td className='numeric'>12.3</td>
                <td className='numeric'>7.7</td>
                <td className='numeric'>8.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>24.4</td>
              </tr>
              <tr>
                <td className='text'>coffee</td>
                <td className='text'>☕️</td>
                <td className='numeric'>2.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.3</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>green tea</td>
                <td className='text'>🍵</td>
                <td className='numeric'>2.5</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.5</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>sake</td>
                <td className='text'>🍶</td>
                <td className='numeric'>39.0</td>
                <td className='numeric'>1.5</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.1</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>champagne</td>
                <td className='text'>emoji icon</td>
                {/* <td className='text'>🍾</td> */}
                <td className='numeric'>89.0</td>
                <td className='numeric'>1.6</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.4</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>red wine</td>
                <td className='text'>🍷</td>
                <td className='numeric'>125.0</td>
                <td className='numeric'>3.8</td>
                <td className='numeric'>0.9</td>
                <td className='numeric'>0.1</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>martini</td>
                <td className='text'>🍸</td>
                <td className='numeric'>210.0</td>
                <td className='numeric'>1.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>tropical drink</td>
                <td className='text'>🍹</td>
                <td className='numeric'>245.0</td>
                <td className='numeric'>32.0</td>
                <td className='numeric'>31.5</td>
                <td className='numeric'>0.6</td>
                <td className='numeric'>2.7</td>
                <td className='numeric'>0.4</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>beer</td>
                <td className='text'>🍺</td>
                <td className='numeric'>153.0</td>
                <td className='numeric'>12.6</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>1.6</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>whiskey</td>
                <td className='text'>emoji icon</td>
                {/* <td className='text'>🥃</td> */}
                <td className='numeric'>70.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td className='text'>soft drink</td>
                <td className='text'>emoji icon</td>
                {/* <td className='text'>🥤</td> */}
                <td className='numeric'>151.0</td>
                <td className='numeric'>38.9</td>
                <td className='numeric'>38.9</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Data from <a href='https://www.eatthismuch.com/'>eat this much</a>{' '}
          food browser
        </p>
      </main>
    </StyledDiv>
  );
}

export default TableDesignP3Row2ColFlex;

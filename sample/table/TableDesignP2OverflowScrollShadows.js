import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  // margin: 0;
  // padding: 0;
  // border: 0;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    white-space: nowrap;
  }

  main {
    padding: 1em;
  }

  .table-wrapper {
    overflow: auto;
    max-width: 100%;
    background: linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
      linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 0 100%,
      radial-gradient(
        farthest-side at 0% 50%,
        rgba(0, 0, 0, 0.2),
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
  }

  .numeric {
    text-align: right;
  }

  p {
    text-align: right;
    margin-top: 1em;
    font-style: italic;
  }
`;

/**
 * 使用滚动条和竖直方向滚动阴影scrolling shadows. css only.
 */
function TableDesignP2OverflowScrollShadows(props) {
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
                <td>milk</td>
                <td>🥛</td>
                <td className='numeric'>149.0</td>
                <td className='numeric'>11.7</td>
                <td className='numeric'>12.3</td>
                <td className='numeric'>7.7</td>
                <td className='numeric'>8.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>24.4</td>
              </tr>
              <tr>
                <td>coffee</td>
                <td>☕️</td>
                <td className='numeric'>2.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.3</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>green tea</td>
                <td>🍵</td>
                <td className='numeric'>2.5</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.5</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>sake</td>
                <td>🍶</td>
                <td className='numeric'>39.0</td>
                <td className='numeric'>1.5</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.1</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>champagne</td>
                <td>🍾</td>
                <td className='numeric'>89.0</td>
                <td className='numeric'>1.6</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.4</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>red wine</td>
                <td>🍷</td>
                <td className='numeric'>125.0</td>
                <td className='numeric'>3.8</td>
                <td className='numeric'>0.9</td>
                <td className='numeric'>0.1</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>martini</td>
                <td>🍸</td>
                <td className='numeric'>210.0</td>
                <td className='numeric'>1.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>tropical drink</td>
                <td>🍹</td>
                <td className='numeric'>245.0</td>
                <td className='numeric'>32.0</td>
                <td className='numeric'>31.5</td>
                <td className='numeric'>0.6</td>
                <td className='numeric'>2.7</td>
                <td className='numeric'>0.4</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>beer</td>
                <td>🍺</td>
                <td className='numeric'>153.0</td>
                <td className='numeric'>12.6</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>1.6</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>whiskey</td>
                <td>🥃</td>
                <td className='numeric'>70.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
                <td className='numeric'>0.0</td>
              </tr>
              <tr>
                <td>soft drink</td>
                <td>🥤</td>
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

export default TableDesignP2OverflowScrollShadows;

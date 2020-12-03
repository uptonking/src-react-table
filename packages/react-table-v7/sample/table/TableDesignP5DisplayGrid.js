/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  table {
    max-width: 100%;
  }

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

  td::before {
    display: none;
  }

  @media screen and (max-width: 680px) {
    table {
      display: block;
      border: 0;
      box-shadow: none;
    }

    thead {
      position: absolute;
      opacity: 0;
    }

    tbody {
      display: block;
      width: 100%;
      min-width: 19em;
      max-width: 25em;
    }

    /* tr是grid container，只有直接子元素td是grid item */
    tr {
      display: grid;
      /* 这里使伪元素标题形成的列的宽度为文字的最大宽度，无需手动指定 */
      grid-template-columns: max-content auto;
      margin-bottom: 1em;
      border-top: 2px solid #3c3c3b;
      border-bottom: 1px solid #3c3c3b;
    }
    /* 自身不创建box，会被pseudo box和child box替换 */
    td {
      display: contents;
    }

    td::before {
      display: inline-block;
      padding: 0.5em;
      border-bottom: 1px solid;
      font-weight: bold;
    }

    /* 此方法缺点是td内必须要包裹的元素，否则无法添加样式，
    因为td被替换掉了，在dev tool中td选中后网页没有元素高亮 */
    td span {
      padding: 0.5em;
      border-bottom: 1px solid;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`;

/**
 * table使用display block，tr使用display grid，td使用display contents，基于css grid layout。
 * 在移动端每个单元格显示一行，且每行左边显示表头名称，各单元格内容左对齐。
 */
function TableDesignP5DisplayGrid(props) {
  useEffect(() => cellHeaders('respTable'));

  return (
    <StyledDiv>
      <table id='respTable'>
        <thead>
          <tr>
            <th>Number</th>
            <th>Player</th>
            <th>Position</th>
            <th>Height</th>
            <th>Weight</th>
            <th>D.O.B.</th>
            <th>Experience</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>0</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/alana-beard/'
                  target='_blank'
                >
                  Alana Beard
                </a>
              </span>
            </td>
            <td>
              <span>G-F</span>
            </td>
            <td>
              <span>5-11</span>
            </td>
            <td>
              <span>160</span>
            </td>
            <td>
              <span>May 14, 1982</span>
            </td>
            <td>
              <span>12</span>
            </td>
            <td>
              <span>Duke/USA</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>17</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/essence-carson/'
                  target='_blank'
                >
                  Essence Carson
                </a>
              </span>
            </td>
            <td>
              <span>F-G</span>
            </td>
            <td>
              <span>6-0</span>
            </td>
            <td>
              <span>163</span>
            </td>
            <td>
              <span>July 28, 1986</span>
            </td>
            <td>
              <span>10</span>
            </td>
            <td>
              <span>Rutgers/USA</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>12</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/chelsea-gray/'
                  target='_blank'
                >
                  Chelsea Gray
                </a>
              </span>
            </td>
            <td>
              <span>G</span>
            </td>
            <td>
              <span>5-11</span>
            </td>
            <td>
              <span>170</span>
            </td>
            <td>
              <span>October 8, 1992</span>
            </td>
            <td>
              <span>3</span>
            </td>
            <td>
              <span>Duke</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>42</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/jantel-lavender/'
                  target='_blank'
                >
                  Jantel Lavender
                </a>
              </span>
            </td>
            <td>
              <span>C</span>
            </td>
            <td>
              <span>6-4</span>
            </td>
            <td>
              <span>185</span>
            </td>
            <td>
              <span>November 12, 1988</span>
            </td>
            <td>
              <span>7</span>
            </td>
            <td>
              <span>Ohio State/USA</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>30</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/nneka-ogwumike/'
                  target='_blank'
                >
                  Nneka Ogwumike
                </a>
              </span>
            </td>
            <td>
              <span>F</span>
            </td>
            <td>
              <span>6-2</span>
            </td>
            <td>
              <span>174</span>
            </td>
            <td>
              <span>July 2, 1990</span>
            </td>
            <td>
              <span>6</span>
            </td>
            <td>
              <span>Stanford/USA</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>3</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/candace-parker/'
                  target='_blank'
                >
                  Candace Parker
                </a>
              </span>
            </td>
            <td>
              <span>F-C</span>
            </td>
            <td>
              <span>6-4</span>
            </td>
            <td>
              <span>175</span>
            </td>
            <td>
              <span>April 19, 1986</span>
            </td>
            <td>
              <span>10</span>
            </td>
            <td>
              <span>Tennessee/USA</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>44</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/karlie-samuelson/'
                  target='_blank'
                >
                  Karlie Samuelson
                </a>
              </span>
            </td>
            <td>
              <span>G</span>
            </td>
            <td>
              <span>6-0</span>
            </td>
            <td>
              <span />
            </td>
            <td>
              <span>May 10, 1995</span>
            </td>
            <td>
              <span>R</span>
            </td>
            <td>
              <span>Stanford</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>1</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/odyssey-sims/'
                  target='_blank'
                >
                  Odyssey Sims
                </a>
              </span>
            </td>
            <td>
              <span>G</span>
            </td>
            <td>
              <span>5-8</span>
            </td>
            <td>
              <span>160</span>
            </td>
            <td>
              <span>July 13, 1992</span>
            </td>
            <td>
              <span>4</span>
            </td>
            <td>
              <span>Baylor</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>10</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/maria-vadeeva/'
                  target='_blank'
                >
                  Maria Vadeeva
                </a>
              </span>
            </td>
            <td>
              <span>C</span>
            </td>
            <td>
              <span>6-4</span>
            </td>
            <td>
              <span />
            </td>
            <td>
              <span>July 16, 1998</span>
            </td>
            <td>
              <span>R</span>
            </td>
            <td>
              <span>Russia</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>24</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/sydney-wiese/'
                  target='_blank'
                >
                  Sydney Wiese
                </a>
              </span>
            </td>
            <td>
              <span>G</span>
            </td>
            <td>
              <span>6-0</span>
            </td>
            <td>
              <span />
            </td>
            <td>
              <span>June 16, 1995</span>
            </td>
            <td>
              <span>1</span>
            </td>
            <td>
              <span>Oregon State</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>2</span>
            </td>
            <td>
              <span>
                <a
                  href='http://www.wnba.com/player/riquna-williams/'
                  target='_blank'
                >
                  Riquna Williams
                </a>
              </span>
            </td>
            <td>
              <span>G</span>
            </td>
            <td>
              <span>5-7</span>
            </td>
            <td>
              <span>165</span>
            </td>
            <td>
              <span>May 28, 1990</span>
            </td>
            <td>
              <span>5</span>
            </td>
            <td>
              <span>Miami (Fla.)</span>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledDiv>
  );
}

export default TableDesignP5DisplayGrid;

/* Function modified from Adrian Roselli's article,
A Responsive Accessible Table, http://adrianroselli.com/2017/11/a-responsive-accessible-table.html
 */
function cellHeaders(tableId) {
  try {
    let thArray = [];
    const table = document.getElementById(tableId);
    const headers = table.getElementsByTagName('th');
    for (let i = 0; i < headers.length; i++) {
      const headingText = headers[i].innerHTML;
      thArray.push(headingText);
    }
    const styleElm = document.createElement('style');
    let styleSheet;
    document.head.appendChild(styleElm);
    styleSheet = styleElm.sheet;
    for (let i = 0; i < thArray.length; i++) {
      styleSheet.insertRule(
        '#' +
          tableId +
          ' td:nth-child(' +
          (i + 1) +
          ')::before {content:"' +
          thArray[i] +
          ': ";}',
        styleSheet.cssRules.length,
      );
    }
  } catch (err) {
    console.log('cellHeaders(): ' + err);
  }
}
// cellHeaders('respTable');

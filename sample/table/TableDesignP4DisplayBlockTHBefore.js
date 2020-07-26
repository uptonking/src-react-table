/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  main {
    display: flex;
    justify-content: center;
  }

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

    /** 表头在视觉上隐藏，但存在markup，提供accessible */
    thead {
      position: absolute;
      opacity: 0;
    }

    tbody {
      display: block;
      min-width: 19em;
      max-width: 25em;
    }

    /** tr和td都是block，每个单元格显示成一行 */
    tr {
      display: block;
      margin-bottom: 1em;
      border-top: 2px solid #3c3c3b;
      border-bottom: 2px solid #3c3c3b;
    }

    td {
      display: flex;
      border-bottom: 1px solid #3c3c3b;
    }

    /* 作为伪元素的表头标题的样式，
    伪元素会创建box就像它们是原来元素的直接子元素，所以before元素是flex容器td的子元素 */
    td::before {
      display: inline-block;
      font-weight: bold;
      /* 伪元素标题会占据剩余空间，将单元格内容挤到最右边，形成右对齐的效果 */
      margin-right: auto;
      padding-right: 1em;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`;

/**
 * table使用display block，移动端显示时每个单元格是一行，各单元格内容右对齐。
 * 每行前面的标题通过before伪元素添加，使用js添加css实现。
 */
function TableDesignP4DisplayBlockTHBefore(props) {
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
            <td>0</td>
            <td>
              <a href='http://www.wnba.com/player/alana-beard/' target='_blank'>
                Alana Beard
              </a>
            </td>
            <td>G-F</td>
            <td>5-11</td>
            <td>160</td>
            <td>May 14, 1982</td>
            <td>12</td>
            <td>Duke/USA</td>
          </tr>
          <tr>
            <td>17</td>
            <td>
              <a
                href='http://www.wnba.com/player/essence-carson/'
                target='_blank'
              >
                Essence Carson
              </a>
            </td>
            <td>F-G</td>
            <td>6-0</td>
            <td>163</td>
            <td>July 28, 1986</td>
            <td>10</td>
            <td>Rutgers/USA</td>
          </tr>
          <tr>
            <td>12</td>
            <td>
              <a
                href='http://www.wnba.com/player/chelsea-gray/'
                target='_blank'
              >
                Chelsea Gray
              </a>
            </td>
            <td>G</td>
            <td>5-11</td>
            <td>170</td>
            <td>October 8, 1992</td>
            <td>3</td>
            <td>Duke</td>
          </tr>
          <tr>
            <td>42</td>
            <td>
              <a
                href='http://www.wnba.com/player/jantel-lavender/'
                target='_blank'
              >
                Jantel Lavender
              </a>
            </td>
            <td>C</td>
            <td>6-4</td>
            <td>185</td>
            <td>November 12, 1988</td>
            <td>7</td>
            <td>Ohio State/USA</td>
          </tr>
          <tr>
            <td>30</td>
            <td>
              <a
                href='http://www.wnba.com/player/nneka-ogwumike/'
                target='_blank'
              >
                Nneka Ogwumike
              </a>
            </td>
            <td>F</td>
            <td>6-2</td>
            <td>174</td>
            <td>July 2, 1990</td>
            <td>6</td>
            <td>Stanford/USA</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <a
                href='http://www.wnba.com/player/candace-parker/'
                target='_blank'
              >
                Candace Parker
              </a>
            </td>
            <td>F-C</td>
            <td>6-4</td>
            <td>175</td>
            <td>April 19, 1986</td>
            <td>10</td>
            <td>Tennessee/USA</td>
          </tr>
          <tr>
            <td>44</td>
            <td>
              <a
                href='http://www.wnba.com/player/karlie-samuelson/'
                target='_blank'
              >
                Karlie Samuelson
              </a>
            </td>
            <td>G</td>
            <td>6-0</td>
            <td />
            <td>May 10, 1995</td>
            <td>R</td>
            <td>Stanford</td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <a
                href='http://www.wnba.com/player/odyssey-sims/'
                target='_blank'
              >
                Odyssey Sims
              </a>
            </td>
            <td>G</td>
            <td>5-8</td>
            <td>160</td>
            <td>July 13, 1992</td>
            <td>4</td>
            <td>Baylor</td>
          </tr>
          <tr>
            <td>10</td>
            <td>
              <a
                href='http://www.wnba.com/player/maria-vadeeva/'
                target='_blank'
              >
                Maria Vadeeva
              </a>
            </td>
            <td>C</td>
            <td>6-4</td>
            <td />
            <td>July 16, 1998</td>
            <td>R</td>
            <td>Russia</td>
          </tr>
          <tr>
            <td>24</td>
            <td>
              <a
                href='http://www.wnba.com/player/sydney-wiese/'
                target='_blank'
              >
                Sydney Wiese
              </a>
            </td>
            <td>G</td>
            <td>6-0</td>
            <td />
            <td>June 16, 1995</td>
            <td>1</td>
            <td>Oregon State</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <a
                href='http://www.wnba.com/player/riquna-williams/'
                target='_blank'
              >
                Riquna Williams
              </a>
            </td>
            <td>G</td>
            <td>5-7</td>
            <td>165</td>
            <td>May 28, 1990</td>
            <td>5</td>
            <td>Miami (Fla.)</td>
          </tr>
        </tbody>
      </table>
    </StyledDiv>
  );
}

export default TableDesignP4DisplayBlockTHBefore;

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

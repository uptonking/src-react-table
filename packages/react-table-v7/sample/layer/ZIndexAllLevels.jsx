import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  div {
    font: 14px Arial;
  }

  span.bold {
    font-weight: bold;
  }

  #div2 {
    z-index: 2;
  }
  #div3 {
    z-index: 1;
  }
  #div4 {
    z-index: 10;
  }

  #div1,
  #div3 {
    height: 80px;
    position: relative;
    border: 1px dashed #669966;
    background-color: #ccffcc;
    padding-left: 5px;
  }

  #div2 {
    opacity: 0.8;
    position: absolute;
    width: 150px;
    height: 200px;
    top: 20px;
    left: 170px;
    border: 1px dashed #990000;
    background-color: #ffdddd;
    text-align: center;
  }

  #div4 {
    opacity: 0.8;
    position: absolute;
    width: 200px;
    height: 70px;
    top: 65px;
    left: 50px;
    border: 1px dashed #000099;
    background-color: #ddddff;
    text-align: left;
    padding-left: 10px;
  }
`;

/**
 * 示例： 2-level HTML hierarchy, z-index on all levels
 * 元素A的z-index比元素B大，则A的内容不管z-index多小都在B内容之上
 */
function ZIndexAllLevels(props) {
  return (
    <StyledDiv>
      <div id='div1'>
        <br />
        <span className='bold'>DIV #1</span>
        <br />
        position: relative;
        <div id='div2'>
          <br />
          <span className='bold'>DIV #2</span>
          <br />
          position: absolute;
          <br />
          z-index: 2;
        </div>
      </div>
      <br />
      <div id='div3'>
        <br />
        <span className='bold'>DIV #3</span>
        <br />
        position: relative;
        <br />
        z-index: 1;
        <div id='div4'>
          <br />
          <span className='bold'>DIV #4</span>
          <br />
          position: absolute;
          <br />
          z-index: 10;
        </div>
      </div>
    </StyledDiv>
  );
}

export default ZIndexAllLevels;

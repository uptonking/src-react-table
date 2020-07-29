import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  .bold {
    font-weight: bold;
    font: 14px Arial;
  }
  #div1,
  #div3 {
    position: relative;
    height: 80px;
    /* width: 100%; */
    padding-left: 5px;
    border: 1px dashed #669966;
    background-color: #ccffcc;
  }
  #div2 {
    position: absolute;
    top: 20px;
    left: 170px;
    /* z-index: 3; */
    z-index: 1;
    opacity: 0.8;
    width: 150px;
    height: 200px;
    border: 1px dashed #990000;
    text-align: center;
    background-color: #ffdddd;
  }
  #div4 {
    position: absolute;
    top: 65px;
    left: 50px;
    z-index: 2;
    opacity: 0.8;
    width: 200px;
    height: 70px;
    padding-left: 10px;
    border: 1px dashed #000099;
    text-align: left;
    background-color: #ddddff;
  }
`;

/**
 * 示例：2-level HTML hierarchy, z-index on the last level
 * 只有一个root context，div1和div3没有z-index，所以不创建stacking context.
 * This means that all their content, including DIV #2 and DIV #4, belongs to the same root stacking context.
 */
function ZIndexLastLevel(props) {
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
          z-index: 1;
        </div>
      </div>
      <br />
      <div id='div3'>
        <br />
        <span className='bold'>DIV #3</span>
        <br />
        position: relative;
        <div id='div4'>
          <br />
          <span className='bold'>DIV #4</span>
          <br />
          position: absolute;
          <br />
          z-index: 2;
        </div>
      </div>
    </StyledDiv>
  );
}

export default ZIndexLastLevel;

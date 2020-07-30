import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  div {
    font: 14px Arial;
  }

  span.bold {
    font-weight: bold;
  }

  div.lev1 {
    position: relative;
    width: 250px;
    height: 70px;
    padding-left: 5px;
    border: 2px outset #669966;
    background-color: #ccffcc;
  }

  #container1 {
    position: absolute;
    top: 24px;
    left: 75px;
    z-index: 1;
  }

  div.lev2 {
    position: relative;
    opacity: 0.9;
    width: 200px;
    height: 60px;
    border: 2px outset #990000;
    padding-left: 5px;
    background-color: #ffdddd;
  }

  #container2 {
    position: absolute;
    top: 20px;
    left: 110px;
    z-index: 1;
  }

  div.lev3 {
    position: relative;
    width: 100px;
    z-index: 10;
    padding-left: 5px;
    border: 2px outset #000099;
    background-color: #ddddff;
  }

  /* .level2to3 ,若使用类选择器，特指度不如div.lev2高，不能覆盖样式*/
  #level2to3 {
    top: -30px;
    left: 110px;
    width: 100px;
    padding-left: 5px;
    /* padding-top: -5px; */
  }
`;

/**
 * 示例：3-level HTML hierarchy, z-index on the second level
 * 这是一个错误用法的示例。
 * 可通过将内层div扁平化到外层再用css调整两者相对位置，来解决第2层modal会挡住弹出的第3层菜单的问题。
 * This problem can be avoided by removing overlapping between different level menus,
 * or by using individual (and different) z-index values assigned through the id selector instead of class selector,
 * or by flattening the HTML hierarchy.
 */
function ZIndex3Level(props) {
  return (
    <StyledDiv>
      {/* 第一层菜单，最下层 */}
      <div className='lev1'>
        <span className='bold'>LEVEL #1</span>
        <div id='container1'>
          {/* 第二层菜单 */}
          <div className='lev2'>
            <br />
            <span className='bold'>LEVEL #2</span>
            <br />
            z-index: 1;
            <div id='container2'>
              {/* 第三层菜单 */}
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
              <div className='lev3'>
                <span className='bold'>LEVEL #3</span>
              </div>
            </div>
          </div>
          <div className='lev2'>
            <br />
            <span className='bold'>LEVEL #2</span>
            <br />
            z-index: 1;
          </div>
          {/* 用level2模拟level3，通过提升并扁平化div实现，添加样式要考虑使用id选择器，因为类选择器难以覆盖 */}
          <div id='level2to3' className='lev2'>
            <br />
            <span className='bold'>use level2 mock level3</span>
            <br />
            z-index: 1;
          </div>
        </div>
      </div>
      <div className='lev1'>
        <span className='bold'>LEVEL #1</span>
      </div>

      <div className='lev1'>
        <span className='bold'>LEVEL #1</span>
      </div>

      <div className='lev1'>
        <span className='bold'>LEVEL #1</span>
      </div>
    </StyledDiv>
  );
}

export default ZIndex3Level;

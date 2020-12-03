import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  .container {
    /* position: absolute; */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 20rem;
    height: 30rem;
    background-color: #f0f0f0;
    border-radius: 3%;
  }

  .headline {
    width: 100%;
    height: 5%;
    text-align: center;
    font-size: 1.5rem;
    margin-top: 1%;
  }

  .display {
    height: 20%;
    width: 80%;
    margin: 0 auto;
    background-color: #dfe2db;
    margin-top: 5%;
    border: 2px solid #c6cbbf;
    border-radius: 5%;
  }

  .button-container {
    height: 75%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-content: flex-start;
    flex-wrap: wrap;
  }

  .all-rows {
    width: 22%;
    background-color: #c6c6c6;
    height: 3.5rem;
    display: inline-block;
    margin: 1% 0 1% 0;
    border-radius: 5%;
    font-size: 2em;
    text-align: center;
    line-height: 3.5rem;
    vertical-align: bottom;
  }

  .row1 {
    margin-top: 5%;
  }

  .clear {
    background-color: #e19ba2;
  }

  .zero {
    width: 47%;
  }

  .decimal {
    flex-grow: 0;
    width: 22%;
  }

  .equal {
    position: relative;
  }
  .equal::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 90%; /* start 10% below the top to cover the rounded border */
    height: 100%;
    background: inherit;
  }
`;

/**
 * 使用flex before伪元素设置相同背景模拟row span。
 * 合并后大单元格内的文字难以居中对齐，需要手动控制位置，且添加事件处理更复杂。
 */
function FlexRowSpan2(props) {
  return (
    <StyledDiv>
      <div className='container'>
        <div className='headline'>JSCalc</div>
        <div className='display' />
        <div className='button-container'>
          <div className='ac all-rows row1 clear'>AC</div>
          <div className='ce all-rows row1 clear'>CE</div>
          <div className='divide all-rows row1'>&divide;</div>
          <div className='multiply all-rows row1'>&times;</div>

          <div className='seven all-rows'>7</div>
          <div className='eight all-rows'>8</div>
          <div className='nine all-rows'>9</div>
          <div className='subtract all-rows'>-</div>

          <div className='four all-rows'>4</div>
          <div className='five all-rows'>5</div>
          <div className='six all-rows'>6</div>
          <div className='addition all-rows'>+</div>

          <div className='three all-rows'>3</div>
          <div className='two all-rows'>2</div>
          <div className='one all-rows'>1</div>
          <div className='all-rows' />

          <div className='zero all-rows'>0</div>
          <div className='decimal all-rows'>.</div>
          <div className='all-rows equal'>=</div>
        </div>
      </div>
    </StyledDiv>
  );
}

export default FlexRowSpan2;

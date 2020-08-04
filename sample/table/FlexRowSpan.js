import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  .container {
    display: flex;
    width: 100%;
    height: 300px;
    flex-wrap: wrap;
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .button {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    /* color: white; */
  }

  .button.rowspan {
    flex: 2;
  }
  .bg-red {
    background: coral;
  }
  .bg-green {
    background: mediumseagreen;
  }
  .bg-blue {
    background: deepskyblue;
  }
  .bg-yellow {
    background: yellow;
  }
`;

/**
 * 使用flex column实现row span
 */
function FlexRowSpan(props) {
  return (
    <StyledDiv>
      <div className='container'>
        <div className='column'>
          <div className='button rowspan bg-yellow'>COL 1 - rowspan</div>

          <div className='button bg-green'>COL 7</div>
        </div>

        <div className='column'>
          <div className='button bg-green'>COL 2</div>

          <div className='button bg-red'>COL 5</div>

          <div className='button bg-blue'>COL 8</div>
        </div>

        <div className='column'>
          <div className='button bg-blue'>COL 3</div>

          <div className='button bg-green'>COL 6</div>

          <div className='button bg-red'>COL 9</div>
        </div>
      </div>
    </StyledDiv>
  );
}

export default FlexRowSpan;

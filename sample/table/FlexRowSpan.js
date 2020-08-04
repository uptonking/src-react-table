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
    color: white;
  }

  .button.rowspan {
    flex: 2;
  }
`;

/**
 * 使用flex实现row span
 */
function FlexRowSpan(props) {
  return (
    <StyledDiv>
      <div className='container'>
        <div className='column'>
          <div className='button rowspan' style='background: red;'>
            Column 1 - rowspan
          </div>

          <div className='button' style='background: green;'>
            Column 7
          </div>
        </div>

        <div className='column'>
          <div className='button' style='background: green'>
            Column 2
          </div>

          <div className='button' style='background: red'>
            Column 5
          </div>

          <div className='button' style='background: blue'>
            Column 8
          </div>
        </div>

        <div className='column'>
          <div className='button' style='background: blue'>
            Column 3
          </div>

          <div className='button' style='background: green'>
            Column 6
          </div>

          <div className='button' style='background: red'>
            Column 9
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

export default FlexRowSpan;

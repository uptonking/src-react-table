import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Static from '../Static';
import _IconSvg from './_IconSvg';

// region Styled Components

const StyledPath0 = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
  fill-rule: nonzero;
`;

const StyledPath1 = styled.path`
  fill: none;
  fill-rule: nonzero;
  stroke: var(--icon-color, ${({ theme }) => theme.color.black});
  stroke-width: 1px;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const StyledRect0 = styled.rect`
  fill: none;
  fill-rule: nonzero;
  stroke: var(--icon-color, ${({ theme }) => theme.color.black});
  stroke-width: 2px;
`;

const StyledRect1 = styled.rect`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
`;

// endregion

export default function _CheckBookIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 37 23'>
      <Static>
        <g transform='matrix(1,0,0,1,-49.8779,-400.813)'>
          <StyledPath0
            className='icon-fill'
            d='M53.001,401.936C53.001,401.384 53.449,400.936 54.001,400.936L82.001,400.936C82.553,400.936 83.001,401.384 83.001,401.936L83.001,404.936L53.001,404.936L53.001,401.936Z'
          />
          <StyledRect0
            className='icon-stroke'
            x='54.001'
            y='404.936'
            width='28'
            height='14'
          />
          <StyledRect1
            className='icon-fill'
            x='56.001'
            y='407.936'
            width='10'
            height='1'
          />
          <StyledRect1
            className='icon-fill'
            x='56.001'
            y='408.936'
            width='10'
            height='1'
          />
          <StyledPath1
            className='icon-stroke'
            d='M64.001,415.974C65.501,414.474 68.801,411.574 70.001,411.974C71.501,412.474 68.001,414.474 69.001,414.974C70.001,415.474 75.501,413.474 76.001,413.974C76.501,414.474 74.501,414.474 75.001,414.974C75.401,415.374 77.834,415.14 79.001,414.974'
          />
        </g>
      </Static>
    </_IconSvg>
  );
}

_CheckBookIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

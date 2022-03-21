import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Static from '../Static';
import _IconSvg from './_IconSvg';

// region Styled Components

const StyledPath0 = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
`;

const StyledPath1 = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
  fill-rule: nonzero;
`;

const StyledRect = styled.rect`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
`;

// endregion

export default function _DepositBookIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 30 19'>
      <Static>
        <g transform='matrix(1,0,0,1,-53.001,-429.5)'>
          <StyledPath0
            className='icon-fill'
            d='M53.001,433.3C53.001,432.251 53.898,431.4 55.004,431.4L56.846,431.4L56.846,433.3L55.004,433.3L55.004,446.6L80.998,446.6L80.998,433.3L68.049,433.3L68.049,431.4L80.998,431.4C82.104,431.4 83.001,432.251 83.001,433.3L83.001,446.6C83.001,447.649 82.104,448.5 80.998,448.5L55.004,448.5C53.898,448.5 53.001,447.649 53.001,446.6L53.001,433.3Z'
          />
          <StyledRect
            className='icon-fill'
            x='59.819'
            y='429.5'
            width='5.301'
            height='5.067'
          />
          <StyledPath1
            className='icon-fill'
            d='M62.469,439.065L57.81,433.326L67.128,433.326L62.469,439.065Z'
          />
        </g>
      </Static>
    </_IconSvg>
  );
}

_DepositBookIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

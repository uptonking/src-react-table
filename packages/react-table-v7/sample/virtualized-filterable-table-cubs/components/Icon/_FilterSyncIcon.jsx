import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Static from '../Static';
import _IconSvg from './_IconSvg';

const StyledPath = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
  fill-rule: nonzero;
`;

export default function _FilterRemoveIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 22 20'>
      <Static>
        <StyledPath d='M18,9 L18,10.5 C20.209139,10.5 22,12.290861 22,14.5 C22,15.32 21.75,16.08 21.33,16.71 L20.24,15.62 C20.41,15.28 20.5,14.9 20.5,14.5 C20.5,13.1192881 19.3807119,12 18,12 L18,13.5 L15.75,11.25 L18,9 L18,9 Z M18,20 L18,18.5 C15.790861,18.5 14,16.709139 14,14.5 C14,13.68 14.25,12.92 14.67,12.29 L15.76,13.38 C15.59,13.72 15.5,14.1 15.5,14.5 C15.5,15.8807119 16.6192881,17 18,17 L18,15.5 L20.25,17.75 L18,20 Z M12,16.88 C12.04,17.18 11.94,17.5 11.71,17.71 C11.32,18.1 10.69,18.1 10.3,17.71 L6.29,13.7 C6.06,13.47 5.96,13.16 6,12.87 L6,7.75 L1.21,1.62 C0.87,1.19 0.95,0.56 1.38,0.22 C1.57,0.08 1.78,0 2,0 L2,0 L16,0 L16,0 C16.22,0 16.43,0.08 16.62,0.22 C17.05,0.56 17.13,1.19 16.79,1.62 L12,7.75 L12,16.88 L12,16.88 Z M4.04,2 L8,7.06 L8,12.58 L10,14.58 L10,7.05 L13.96,2 L4.04,2 Z' />
      </Static>
    </_IconSvg>
  );
}

_FilterRemoveIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Static from '../Static';
import _IconSvg from './_IconSvg';

const StyledPath = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
  fill-rule: nonzero;
`;

export default function _UnlockedIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 129 172'>
      <Static>
        <StyledPath d='M117.857,85.714L35.714,85.714L35.714,50C35.714,34.264 48.549,21.429 64.286,21.429C80.022,21.429 92.857,34.264 92.857,50C92.857,53.906 96.094,57.143 100,57.143L107.143,57.143C111.049,57.143 114.286,53.906 114.286,50C114.286,22.433 91.853,0 64.286,0C36.719,0 14.286,22.433 14.286,50L14.286,85.714L10.714,85.714C4.799,85.714 0,90.514 0,96.429L0,160.715C0,166.63 4.799,171.429 10.714,171.429L117.857,171.429C123.772,171.429 128.572,166.63 128.572,160.715L128.572,96.429C128.572,90.514 123.772,85.714 117.857,85.714Z' />
      </Static>
    </_IconSvg>
  );
}

_UnlockedIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

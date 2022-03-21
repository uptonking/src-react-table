import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Static from '../Static';
import _IconSvg from './_IconSvg';

const StyledPath = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.black});
  fill-rule: nonzero;
`;

export default function _LockIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 129 158'>
      <Static>
        <StyledPath d='M35.714,71.429L35.714,50C35.714,34.263 48.549,21.429 64.286,21.429C80.022,21.429 92.857,34.263 92.857,50L92.857,71.429L35.714,71.429ZM128.572,82.143C128.572,76.228 123.772,71.429 117.857,71.429L114.286,71.429L114.286,50C114.286,22.545 91.741,0 64.286,0C36.83,0 14.286,22.545 14.286,50L14.286,71.429L10.714,71.429C4.799,71.429 0,76.228 0,82.143L0,146.429C0,152.344 4.799,157.143 10.714,157.143L117.857,157.143C123.772,157.143 128.572,152.344 128.572,146.429L128.572,82.143Z' />
      </Static>
    </_IconSvg>
  );
}

_LockIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

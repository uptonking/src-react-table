import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _FirstArrowIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polygon points='7.5 12.5 19.5 4.5 19.5 20.5'></polygon>
          <line x1='4.5' y1='21.5' x2='4.5' y2='3.5'></line>
        </g>
      </Static>
    </_IconSvg>
  );
}

_FirstArrowIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

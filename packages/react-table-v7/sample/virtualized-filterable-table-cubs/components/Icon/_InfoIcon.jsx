import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _InfoIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='9'></circle>
          <circle
            fill='currentColor'
            strokeWidth='0'
            cx='12'
            cy='7'
            r='1'
          ></circle>
          <line x1='12' y1='18' x2='12' y2='10'></line>
        </g>
      </Static>
    </_IconSvg>
  );
}

_InfoIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

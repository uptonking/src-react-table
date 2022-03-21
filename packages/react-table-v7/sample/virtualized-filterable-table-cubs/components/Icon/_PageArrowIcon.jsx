import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _PageArrowIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
          strokeLinecap='round'
        >
          <polyline points='16.5 18.25 20.25 14.5 16.5 10.75' />
          <line x1='8.75' y1='14.5' x2='20' y2='14.5' />
          <polyline points='19 21 5 21 5 3 14 3 19 8' />
          <polygon points='14 3 19 8 14 8' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_PageArrowIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

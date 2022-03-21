import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _PageSearchIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polygon points='5 21 5 3 14 3 19 8 19 21' />
          <polygon points='14 3 19 8 14 8' />
          <circle cx='12' cy='14' r='3' />
          <line x1='18.5' y1='20.5' x2='14.5' y2='16.5' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_PageSearchIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

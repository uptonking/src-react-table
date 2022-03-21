import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _ClipboardIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polygon points='4 20 4 4 9 4 10.5 2 13.5 2 15 4 20 4 20 20' />
          <line x1='7' y1='10' x2='17' y2='10' />
          <line x1='7' y1='13' x2='17' y2='13' />
          <line x1='7' y1='16' x2='14' y2='16' />
          <polyline points='7 4 7 6.5 17 6.5 17 4' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_ClipboardIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

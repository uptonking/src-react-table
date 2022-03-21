import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _ApplicationIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polygon points='3.00949992 21.0314319 3 3.03143187 9 3.03143187 21 3.03143187 21 20.9609869' />
          <line x1='3' y1='8' x2='21' y2='8' />
          <line x1='9.5' y1='8' x2='9.5' y2='21.0314319' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_ApplicationIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

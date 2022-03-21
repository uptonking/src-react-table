import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _ExternalIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polyline points='13.0199307 3.03143187 21 3.03143187 21 11.1235587' />
          <polyline points='21 14.0630618 21 20.9609869 3.00949992 21.0314319 3 3.03143187 9.99260734 3.03143187' />
          <line x1='10' y1='14' x2='21' y2='3' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_ExternalIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _TableResetIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <path d='M10,14 L17.5,14 C19.5,14 21,15.5 21,17.5 C21,19.5 19.5,21 17.5,21 C16,21 14.33,21 12,21 L12,21 L3,21 L3,3 L9,3 L21,3 L21,12'></path>
          <polyline points='14 10 10 14 14 18' strokeLinecap='round'></polyline>
          <line x1='3' y1='7' x2='21' y2='7'></line>
          <line x1='12' y1='2.5' x2='12' y2='7'></line>
        </g>
      </Static>
    </_IconSvg>
  );
}

_TableResetIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

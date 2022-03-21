import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _TableSyncIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <path d='M17,13 L5,13 C3.8954305,13 3,12.1045695 3,11 L3,3 L3,3 L21,3 L21,17 C21,18.1045695 20.1045695,19 19,19 L6,19 L6,19'></path>
          <polyline
            points='8.5 16.5 6 19 8.59316513 21.6097049'
            strokeLinecap='round'
          ></polyline>
          <polyline
            points='14.5 15.5 17 13 14.4 10.5'
            strokeLinecap='round'
          ></polyline>
          <line x1='3' y1='7' x2='21' y2='7'></line>
          <line x1='12' y1='2.5' x2='12' y2='7'></line>
        </g>
      </Static>
    </_IconSvg>
  );
}

_TableSyncIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

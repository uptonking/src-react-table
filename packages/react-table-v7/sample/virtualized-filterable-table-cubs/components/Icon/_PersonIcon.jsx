import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _PersonIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <path d='M7.5,14 L16.5,14 C17.8807119,14 19,15.1192881 19,16.5 L19,20 L19,20 L5,20 L5,16.5 C5,15.1192881 6.11928813,14 7.5,14 Z'></path>
          <circle cx='12' cy='7.5' r='3.5'></circle>
        </g>
      </Static>
    </_IconSvg>
  );
}

_PersonIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

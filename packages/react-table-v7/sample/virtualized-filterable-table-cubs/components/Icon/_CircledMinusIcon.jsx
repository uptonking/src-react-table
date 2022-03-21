import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _CircledMinusIcon(props) {
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
          <line x1='7' y1='12' x2='17' y2='12'></line>
        </g>
      </Static>
    </_IconSvg>
  );
}

_CircledMinusIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

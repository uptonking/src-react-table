import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _PlusIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <line x1='2.5' y1='12' x2='21.5' y2='12' />
          <line x1='12' y1='2.5' x2='12' y2='21.5' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_PlusIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

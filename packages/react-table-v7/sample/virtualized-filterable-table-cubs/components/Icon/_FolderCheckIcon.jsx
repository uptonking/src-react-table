import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _FolderCheckIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polygon points='3 20 3 4 9 4 10.5 6 21 6 21 20' />
          <polyline points='8 13 10.5 15.5 15.5 10.5' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_FolderCheckIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

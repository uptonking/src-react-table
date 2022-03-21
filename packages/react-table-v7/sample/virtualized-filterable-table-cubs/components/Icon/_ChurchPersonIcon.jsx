import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _ChurchPersonIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polyline points='4.5 19 4.5 13 3 13 10.5 9.5 12 2 13.5 9.5 21 13 19.5 13 19.5 19' />
          <path d='M9.5,18 L14.5,18 C15.3284271,18 16,18.6715729 16,19.5 L16,21 L16,21 L8,21 L8,19.5 C8,18.6715729 8.67157288,18 9.5,18 Z' />
          <circle cx='12' cy='14' r='2' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_ChurchPersonIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

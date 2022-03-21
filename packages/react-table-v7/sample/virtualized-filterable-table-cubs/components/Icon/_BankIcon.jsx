import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _BankIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <polygon points='11.5 3 3 7.5 3 8 20 8 20 7.5' />
          <line x1='5.5' y1='10.25' x2='5.5' y2='18.75' />
          <line x1='11.5' y1='10.25' x2='11.5' y2='18.75' />
          <line x1='17.5' y1='10.25' x2='17.5' y2='18.75' />
          <line x1='2' y1='21' x2='21' y2='21' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_BankIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

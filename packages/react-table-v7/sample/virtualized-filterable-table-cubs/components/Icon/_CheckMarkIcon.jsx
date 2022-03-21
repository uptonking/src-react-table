import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _CheckMarkIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M7.453 17.542a.75.75 0 0 0 1.102.065L20.02 6.54a.75.75 0 1 0-1.042-1.08L7.513 16.528l1.102.064L4.58 11.66a.75.75 0 0 0-1.162.95l4.034 4.932z'
        />
      </Static>
    </_IconSvg>
  );
}

_CheckMarkIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

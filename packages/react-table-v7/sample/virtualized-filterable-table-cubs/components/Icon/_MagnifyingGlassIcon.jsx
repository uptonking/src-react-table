import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _MagnifyingGlassIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M21.07 19.65l-5-5a7.5 7.5 0 1 0-1.41 1.41l5 5a1 1 0 0 0 1.41-1.41zm-6.72-5.3a6 6 0 1 1 0-8.49 6 6 0 0 1 0 8.49z'
        />
      </Static>
    </_IconSvg>
  );
}

_MagnifyingGlassIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

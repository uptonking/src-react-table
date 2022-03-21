import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _ChevronRight(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M11.462 16.223a.75.75 0 0 0 1.076 0l5.25-5.4a.75.75 0 0 0-1.076-1.046l-4.71 4.85-4.714-4.85a.75.75 0 1 0-1.076 1.046l5.25 5.4z'
        />
      </Static>
    </_IconSvg>
  );
}

_ChevronRight.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

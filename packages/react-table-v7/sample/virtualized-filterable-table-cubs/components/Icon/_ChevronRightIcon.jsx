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
          d='M16.223 12.538a.75.75 0 0 0 0-1.076l-5.4-5.25a.75.75 0 1 0-1.046 1.076l4.858 4.702-4.858 4.722a.75.75 0 0 0 1.046 1.076l5.4-5.25z'
        />
      </Static>
    </_IconSvg>
  );
}

_ChevronRight.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

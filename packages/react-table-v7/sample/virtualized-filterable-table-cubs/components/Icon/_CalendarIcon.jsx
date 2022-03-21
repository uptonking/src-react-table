import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _CalendarIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M18 4.5V3a1 1 0 1 0-2 0v1.5H8V3a1 1 0 1 0-2 0v1.5H3V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4.5zm1.5 15h-15V9h15zm-9.5-5H6v-4h4z'
        />
      </Static>
    </_IconSvg>
  );
}

_CalendarIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

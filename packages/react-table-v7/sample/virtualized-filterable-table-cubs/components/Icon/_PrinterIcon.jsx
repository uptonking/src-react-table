import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _PrinterIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M5.24 5.5h13.52a.75.75 0 0 0 0-1.5H5.24a.75.75 0 0 0-.74.75.75.75 0 0 0 .74.75zM20.22 6.5H3.78A1.26 1.26 0 0 0 2.5 7.75v8A1.26 1.26 0 0 0 3.76 17H5.5v2.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V17h1.73a1.26 1.26 0 0 0 1.27-1.25v-8a1.27 1.27 0 0 0-1.28-1.25zM17 19H7v-4h10zm3-3.5h-1.5v-2h-13v2H4V8h16z'
        />
        <path
          fill='currentColor'
          d='M6.25 11.5h4.09a.75.75 0 1 0 0-1.5H6.25a.75.75 0 1 0 0 1.5z'
        />
      </Static>
    </_IconSvg>
  );
}

_PrinterIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

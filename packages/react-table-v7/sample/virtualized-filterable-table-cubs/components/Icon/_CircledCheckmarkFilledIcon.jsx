import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _CircledCheckmarkFilledIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g fill='currentColor' fillRule='evenodd' clipRule='evenodd'>
          <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm5.192-14.25a.997.997 0 00-.327.212l-7.452 7.196-2.187-2.701a1.007 1.007 0 00-1.412-.159l-.002.002a1.002 1.002 0 00-.141 1.415l2.82 3.481c.082.102.183.187.298.25a.997.997 0 001.25-.113L18.254 9.4l.002-.002a1.006 1.006 0 00.025-1.411l-.001-.001a.999.999 0 00-1.088-.237z' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_CircledCheckmarkFilledIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

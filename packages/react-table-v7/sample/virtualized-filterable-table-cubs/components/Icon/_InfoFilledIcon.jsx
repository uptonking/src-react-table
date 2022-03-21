import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _InfoFilledIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g fill='currentColor' fillRule='evenodd' clipRule='evenodd'>
          <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm.1-16.55c.752 0 1.336.547 1.336 1.282 0 .728-.585 1.273-1.336 1.273-.75 0-1.336-.545-1.336-1.273 0-.735.584-1.282 1.336-1.282zM11.014 9.5v8.884h2.172V9.5h-2.172z' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_InfoFilledIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

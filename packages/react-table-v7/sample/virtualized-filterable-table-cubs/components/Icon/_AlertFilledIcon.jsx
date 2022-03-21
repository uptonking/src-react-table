import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _AlertFilledIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g fill='currentColor' fillRule='evenodd' clipRule='evenodd'>
          <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.828 6.527l.188 7.562h1.968l.188-7.562h-2.344zm2.445 10.242c0-.688-.562-1.227-1.273-1.227-.71 0-1.273.54-1.273 1.227s.562 1.226 1.273 1.226c.71 0 1.273-.539 1.273-1.226z' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_AlertFilledIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _AlertWarningFilledIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g fill='currentColor' fillRule='evenodd' clipRule='evenodd'>
          <path d='M11.104 3.717a1.035 1.035 0 011.792 0l8.964 15.526c.398.69-.1 1.552-.897 1.552H3.037a1.035 1.035 0 01-.897-1.552l8.964-15.525zm2.075 5.148h-2.357l.222 5.685h1.914l.22-5.685zm.081 8.185a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_AlertWarningFilledIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _MenuIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M4 7.75c0-.414.334-.75.75-.75h14.5a.749.749 0 1 1 0 1.5H4.75A.748.748 0 0 1 4 7.75zm0 4c0-.414.334-.75.75-.75h14.5a.749.749 0 1 1 0 1.5H4.75a.748.748 0 0 1-.75-.75zm0 4c0-.414.334-.75.75-.75h14.5a.749.749 0 1 1 0 1.5H4.75a.748.748 0 0 1-.75-.75z'
        />
      </Static>
    </_IconSvg>
  );
}

_MenuIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

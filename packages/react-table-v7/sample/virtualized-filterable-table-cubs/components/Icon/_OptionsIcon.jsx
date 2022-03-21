import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _OptionsIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M12 16c1.12 0 2.067.736 2.385 1.75h5.865c.414 0 .75.333.75.75 0 .414-.344.75-.75.75h-5.865a2.5 2.5 0 01-4.77 0H3.75A.749.749 0 013 18.5c0-.414.344-.75.75-.75h5.864A2.501 2.501 0 0112 16zm0 1.5c-.551 0-1 .449-1 1a1.001 1.001 0 101-1zm-4-8c1.12 0 2.067.736 2.385 1.75h9.865c.414 0 .75.333.75.75 0 .414-.344.75-.75.75h-9.865a2.5 2.5 0 01-4.77 0H3.75A.749.749 0 013 12c0-.414.344-.75.75-.75h1.864A2.501 2.501 0 018 9.5zM8 11c-.551 0-1 .449-1 1a1.001 1.001 0 101-1zm7.988-8a2.5 2.5 0 012.386 1.75h1.876c.414 0 .75.333.75.75 0 .414-.344.75-.75.75h-1.877a2.5 2.5 0 01-4.77 0H3.75A.749.749 0 013 5.5c0-.414.344-.75.75-.75h9.852A2.5 2.5 0 0115.988 3zm0 1.5c-.5 0-.916.37-.989.849v.302c.073.48.488.849.989.849.551 0 1-.449 1-1 0-.551-.449-1-1-1z'
        />
      </Static>
    </_IconSvg>
  );
}

_OptionsIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

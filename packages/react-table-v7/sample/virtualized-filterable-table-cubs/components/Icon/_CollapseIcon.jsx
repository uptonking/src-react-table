import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _ExternalIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M9.674 15.387v3.678a.75.75 0 1 0 1.5 0v-5.459a.75.75 0 0 0-.75-.75l-5.461.002a.75.75 0 0 0 0 1.5h3.62l-5.071 5.07a.75.75 0 0 0 1.06 1.06l5.102-5.101zm5.713-5.713h3.678a.75.75 0 1 1 0 1.5h-5.459a.75.75 0 0 1-.75-.75l.002-5.461a.75.75 0 0 1 1.5 0v3.62l5.07-5.071a.75.75 0 0 1 1.06 1.06l-5.101 5.102z'
        />
      </Static>
    </_IconSvg>
  );
}

_ExternalIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

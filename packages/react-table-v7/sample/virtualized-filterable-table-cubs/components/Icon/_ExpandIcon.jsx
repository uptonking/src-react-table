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
          d='M19.205 5.856v3.648a.75.75 0 1 0 1.5 0V4.046a.75.75 0 0 0-.749-.75h-5.462a.75.75 0 0 0 0 1.5h3.649l-5.086 5.086a.75.75 0 0 0 1.061 1.06l5.087-5.086zm-13.35 13.35h3.65a.75.75 0 1 1 0 1.499h-5.46a.75.75 0 0 1-.749-.749v-5.462a.75.75 0 0 1 1.5 0v3.649l5.086-5.086a.75.75 0 0 1 1.06 1.061l-5.086 5.087z'
        />
      </Static>
    </_IconSvg>
  );
}

_ExternalIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

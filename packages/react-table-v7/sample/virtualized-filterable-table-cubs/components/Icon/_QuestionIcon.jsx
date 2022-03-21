import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _QuestionIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='9'></circle>
          <circle
            fill='currentColor'
            strokeWidth='0'
            cx='12'
            cy='17'
            r='1'
          ></circle>
          <path d='M12,14.5 C12,11 14.5,11.5 14.5,9.5 C14.5,8.25 13.25,7.5 12,7.5 C10.75,7.5 9.5,8.5 9.5,9.5'></path>
        </g>
      </Static>
    </_IconSvg>
  );
}

_QuestionIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

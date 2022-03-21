import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _QuestionIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M17.984 17.594a.803.803 0 0 1 1.137 1.137 8.852 8.852 0 0 1-12.525 0 8.852 8.852 0 0 1 0-12.525c3.338-3.338 8.678-3.465 12.151-.358L18.58 3.87a.79.79 0 0 1 .723-.867.794.794 0 0 1 .875.731l.357 4.014a.813.813 0 0 1-.731.874l-4.005.35a.829.829 0 0 1-.89-.731.828.828 0 0 1 .739-.883l2.17-.182c-2.838-2.663-7.312-2.607-10.086.167a7.245 7.245 0 0 0 0 10.251 7.245 7.245 0 0 0 10.252 0z'
        />{' '}
      </Static>
    </_IconSvg>
  );
}

_QuestionIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

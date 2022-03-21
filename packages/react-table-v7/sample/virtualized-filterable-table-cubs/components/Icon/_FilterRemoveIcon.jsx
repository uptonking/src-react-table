import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _FilterRemoveIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M9.85 21.75a.85.85 0 0 1-.43-.12.88.88 0 0 1-.42-.77V14.1L2.53 5.41a1.49 1.49 0 0 1-.28-.84V3.22a1 1 0 0 1 1-1h17.54a1 1 0 0 1 1 1v1.36a1.49 1.49 0 0 1-.28.84L15 14.15v4.19a1.15 1.15 0 0 1-.57 1l-4.13 2.29a.92.92 0 0 1-.45.12zm.09-.75zM3.75 3.75v.83l6.47 8.68a1.5 1.5 0 0 1 .28.84v5.7l3-1.68v-4a1.51 1.51 0 0 1 .28-.84l6.49-8.73v-.8zm16.5-.53z'
        />
        <path
          stroke='currentColor'
          strokeWidth={1.5}
          d='M17 21 l6 -6'
          strokeLinecap='round'
        />
        <path
          stroke='currentColor'
          strokeWidth={1.5}
          d='M17 15 l6 6'
          strokeLinecap='round'
        />
      </Static>
    </_IconSvg>
  );
}

_FilterRemoveIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

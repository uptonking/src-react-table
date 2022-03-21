import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _SortAscIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M11.4709 4.2136C11.7638 3.92071 12.2386 3.92071 12.5315 4.2136L17.1277 8.8098C17.4206 9.10269 17.4206 9.57756 17.1277 9.87046C16.8348 10.1633 16.3599 10.1633 16.0671 9.87046L12.7512 6.55459V19.25C12.7512 19.6642 12.4154 20 12.0012 20C11.587 20 11.2512 19.6642 11.2512 19.25V6.55459L7.93533 9.87046C7.64244 10.1633 7.16756 10.1633 6.87467 9.87046C6.58178 9.57756 6.58178 9.10269 6.87467 8.8098L11.4709 4.2136Z'
        />
      </Static>
    </_IconSvg>
  );
}

_SortAscIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

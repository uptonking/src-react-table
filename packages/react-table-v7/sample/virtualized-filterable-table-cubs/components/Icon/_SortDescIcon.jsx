import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _SortDescIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M12.5315 19.7803C12.2386 20.0732 11.7638 20.0732 11.4709 19.7803L6.87466 15.1841C6.58177 14.8912 6.58177 14.4164 6.87466 14.1235C7.16756 13.8306 7.64243 13.8306 7.93532 14.1235L11.2512 17.4393L11.2512 4.74393C11.2512 4.32972 11.587 3.99393 12.0012 3.99393C12.4154 3.99393 12.7512 4.32972 12.7512 4.74393L12.7512 17.4393L16.0671 14.1235C16.3599 13.8306 16.8348 13.8306 17.1277 14.1235C17.4206 14.4164 17.4206 14.8912 17.1277 15.1841L12.5315 19.7803Z'
        />
      </Static>
    </_IconSvg>
  );
}

_SortDescIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

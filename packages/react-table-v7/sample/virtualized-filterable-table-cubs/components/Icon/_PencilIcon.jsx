import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _PencilIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M16.255 5.649l.893-.894.354-.353a.244.244 0 0 1 .344.01l1.768 1.767a.244.244 0 0 1 .01.344L18.375 7.77l-2.12-2.121zm-6.57 10.813c-.287.286-.898.638-1.294.744l-2.402.804.83-2.376c.106-.396.458-1.007.744-1.294l7.631-7.63 2.122 2.12-7.631 7.632zM20.662 5.105l-1.768-1.767a1.754 1.754 0 0 0-2.48.005l-1.232 1.232-1.06 1.06-7.852 7.852c-.481.481-.993 1.34-1.186 1.993l-1.05 3.556c-.17.57.36 1.1.93.93l3.555-1.05c.653-.194 1.512-.705 1.994-1.187l7.85-7.85 1.061-1.061 1.232-1.232c.687-.687.69-1.797.006-2.48z'
        />
      </Static>
    </_IconSvg>
  );
}

_PencilIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

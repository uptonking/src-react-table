import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _CrossMarkIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M11.4 13.06l4.596 4.597a.749.749 0 1 0 1.06-1.06l-4.595-4.597 4.596-4.596a.749.749 0 1 0-1.06-1.06l-4.597 4.595-4.596-4.596a.749.749 0 1 0-1.06 1.06l4.595 4.597-4.596 4.596a.749.749 0 1 0 1.06 1.06l4.597-4.595z'
        />
      </Static>
    </_IconSvg>
  );
}

_CrossMarkIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

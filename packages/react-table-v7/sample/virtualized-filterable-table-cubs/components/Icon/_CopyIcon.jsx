import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _CopyIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M19.55 17.1H15.3v-5.925c0-.008-.004-.015-.005-.023a.727.727 0 0 0-.215-.572L10.3 5.799V3.85a.25.25 0 0 1 .25-.25h4.25v4.26c0 .414.336.75.75.75h4.25v8.24a.25.25 0 0 1-.25.25zm-6 3.25h-9a.25.25 0 0 1-.25-.25v-13a.25.25 0 0 1 .25-.25H8.8v4.26c0 .414.336.75.75.75h4.25v8.24a.25.25 0 0 1-.25.25zM10.3 8.877v-.956l2.439 2.439H10.3V8.877zm6-4.206l2.439 2.439H16.3V4.671zm4.995 3.231a.727.727 0 0 0-.215-.572l-5-5a.726.726 0 0 0-.561-.215c-.025-.003-.048-.015-.074-.015H10.55A1.75 1.75 0 0 0 8.8 3.85v1.5H4.55A1.75 1.75 0 0 0 2.8 7.1v13c0 .967.784 1.75 1.75 1.75h9a1.75 1.75 0 0 0 1.75-1.75v-1.5h4.25a1.75 1.75 0 0 0 1.75-1.75V7.925c0-.008-.004-.015-.005-.023z'
        />
      </Static>
    </_IconSvg>
  );
}

_CopyIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

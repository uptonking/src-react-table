import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _TrashIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <path
          fill='currentColor'
          d='M8.923 4.875h-3.68a.752.752 0 0 0-.743.75c0 .417.333.75.744.75h13.512a.752.752 0 0 0 .744-.75.745.745 0 0 0-.744-.75h-3.68v-.812c0-.87-.694-1.563-1.552-1.563h-3.048c-.847 0-1.553.7-1.553 1.563v.812zm6.75 15.801l1.28-12.5a.769.769 0 0 1 .848-.672c.426.04.737.408.695.82l-1.28 12.5a.766.766 0 0 1-.771.676h-8.89a.766.766 0 0 1-.771-.676l-1.28-12.5a.757.757 0 0 1 .695-.82c.426-.041.806.26.848.672l1.28 12.5L7.555 20h8.89l-.772.676z'
        />
      </Static>
    </_IconSvg>
  );
}

_TrashIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

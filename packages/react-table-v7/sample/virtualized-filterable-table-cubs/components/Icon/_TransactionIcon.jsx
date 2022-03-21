import PropTypes from 'prop-types';
import React from 'react';

import Static from '../Static';
import _IconSvg from './_IconSvg';

export default function _TransactionIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 24 24'>
      <Static>
        <g
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        >
          <path d='M16.5,14.7 C10.2,14.7 5.83763772,14.7009882 3.41291315,14.7029646 C4.56070596,18.3528298 7.97121312,21 12,21 C16.9705627,21 21,16.9705627 21,12' />
          <path d='M3,12 C3,7.02943725 7.02943725,3 12,3 C16.0324085,3 19.4454251,5.65193156 20.590136,9.30688068 C17.7748864,9.3 16.9278675,9.3 13.0978523,9.3 C10.5445089,9.3 8.67855812,9.3 7.5,9.3' />
          <polyline points='13.35 12 16.95 14.7 13.35 17.4' />
          <polyline points='10.65 12 7.05 9.3 10.65 6.6' />
        </g>
      </Static>
    </_IconSvg>
  );
}

_TransactionIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Static from '../Static';
import _IconSvg from './_IconSvg';

// region Styled Components

const StyledPath = styled.path`
  fill: var(--icon-color, ${({ theme }) => theme.color.yellow500});
`;

// endregion

export default function _OverrideIcon(props) {
  return (
    <_IconSvg {...props} viewBox='0 0 25 12'>
      <Static>
        <g transform='translate(0.4755,-6.598508)'>
          <StyledPath
            className='icon-path'
            d='M10.521255,10.982933 h 9.018219 c 0.497805,0 0.901822,-0.403415 0.901822,-0.901822 0,-0.4984067 -0.404017,-0.9018217 -0.901822,-0.9018217 h -9.018219 c -0.498407,0 -0.9018217,0.403415 -0.9018217,0.9018217 0,0.498407 0.4034147,0.901822 0.9018217,0.901822 Z
               M7.214575,13.688399 c 0,0.498407 0.4034149,0.901821 0.9018218,0.901821 h 9.0182182 c 0.497806,0 0.901822,-0.403414 0.901822,-0.901821 0,-0.498407 -0.404016,-0.901822 -0.901822,-0.901822 H 8.1163968 c -0.4984069,0 -0.9018218,0.403415 -0.9018218,0.901822 Z
               M23.146761,16.393864 h -9.018218 c -0.498407,0 -0.901822,0.403415 -0.901822,0.901822 0,0.498407 0.403415,0.901822 0.901822,0.901822 h 9.018218 c 0.497806,0 0.901822,-0.403415 0.901822,-0.901822 0,-0.498407 -0.404016,-0.901822 -0.901822,-0.901822 Z
               M4.5668259,16.393864 c -1.5234777,0 -2.7631822,-1.213852 -2.7631822,-2.705465 0,-1.491614 1.2397045,-2.705466 2.7631822,-2.705466 h 0.243492 L 4.289666,11.474727 c -0.3925931,0.370348 -0.4106295,0.988998 -0.040281,1.38099 0.1923886,0.203811 0.4515121,0.306619 0.7106356,0.306619 0.2404858,0 0.4815729,-0.08838 0.6703542,-0.266338 L 7.70216,10.940848 C 8.1284211,10.538636 8.1542734,9.8586618 7.7580729,9.4239837 L 5.8347875,7.317929 C 5.4716539,6.9199249 4.8536053,6.8916678 4.455,7.2554027 4.0563948,7.6191375 4.0281377,8.2371861 4.3924737,8.6357913 l 0.4960021,0.543498 H 4.5668259 C 2.0483381,9.1792893 0,11.201775 0,13.688399 c 0,2.486623 2.0483381,4.509109 4.5668259,4.509109 H 11.12247 c 0.498407,0 0.901822,-0.403415 0.901822,-0.901822 0,-0.498407 -0.403415,-0.901822 -0.901822,-0.901822 Z'
          />
        </g>
      </Static>
    </_IconSvg>
  );
}

_OverrideIcon.propTypes = {
  fixedSize: PropTypes.bool,
  svgClassName: PropTypes.string,
};

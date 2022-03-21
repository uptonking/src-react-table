import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

// region Styled Components

const StyledWrapper = styled.span`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: ${({ size }) => size === 'large' && '32px'};
  ${({ size }) =>
    size === 'xs'
      ? `
    font-size: 16px;
    width: 1em;
    height: 1em;
  `
      : size === 'sm'
      ? `
    font-size: 20px;
    width: 1em;
    height: 1em;
  `
      : size === 'md'
      ? `
    font-size: 24px;
    width: 1em;
    height: 1em;
  `
      : size === 'lg'
      ? `
    font-size: 32px;
    width: 1em;
    height: 1em;
  `
      : ``}
`;

const StyledSVG = styled.svg`
  width: 1em;
  height: 1em;
`;

// endregion

export default function Spinner({
  inline,
  size,
  spinnerClassName,
  style,
  ...props
}) {
  const dashArray = 2.75;
  const progress = 0.1;

  return (
    <StyledWrapper
      {...props}
      style={style}
      inline={inline}
      size={size}
      aria-hidden='true'
    >
      <StyledSVG
        viewBox='0 0 24 24'
        role='progressbar'
        className={spinnerClassName}
        fill='none'
        stroke='currentColor'
        strokeLinecap='square'
        vectorEffect='non-scaling-stroke'
        strokeWidth={'0.0625em' || '2.5'}
        aria-valuemin='0'
        aria-valuemax='4'
      >
        <circle
          cx='12'
          cy='12'
          r='10.5'
          fill='none'
          stroke='currentColor'
          opacity='0.2'
          vectorEffect='non-scaling-stroke'
        ></circle>
        <circle
          cx='12'
          cy='12'
          r='10.5'
          vectorEffect='non-scaling-stroke'
          style={{
            strokeDasharray: `${dashArray}em`,
            strokeDashoffset: `${dashArray - dashArray * progress}em`,
          }}
        ></circle>
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 0 0'
          to='360 0 0'
          dur='1.2s'
          repeatCount='indefinite'
        />
      </StyledSVG>
    </StyledWrapper>
  );
}

Spinner.propTypes = {
  inline: PropTypes.bool,
  size: PropTypes.oneOf(['font-size', 'large']),
  spinnerClassName: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'font-size',
};

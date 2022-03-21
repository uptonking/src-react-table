import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// region Styled Components

const theme = {
  color: {
    primary: '#157493',
    success: '#74BB49',
    warning: '#FFAE0C',
    danger: '#DC3838',
    black: '#000000',
  },
};

const StyledSpan = styled.span`
  position: relative;
  display: inline-flex;
  justify-content: center;
  width: ${({ fixedSize }) => fixedSize && '1em'};
  font-size: inherit;
  line-height: 1;
  vertical-align: middle;
  speak: none;
  user-select: none;
  box-sizing: border-box;
  /* color: var(--icon-color, ${theme.color.black}); */
  ${({ size }) =>
    size === 'xs'
      ? `
    font-size: 16px;
  `
      : size === 'sm'
      ? `
    font-size: 20px;
  `
      : size === 'md'
      ? `
    font-size: 24px;
  `
      : size === 'lg'
      ? `
    font-size: 32px;
  `
      : ``}
  ${({ color }) =>
    color === 'primary'
      ? `
    color: ${theme.color.primary};
  `
      : color === 'success'
      ? `
    color: ${theme.color.success};
  `
      : color === 'warning'
      ? `
    color: ${theme.color.warning};
  `
      : color === 'danger'
      ? `
    color: ${theme.color.danger};
  `
      : ``}
`;

const StyledSvg = styled.svg`
  display: inline-block;
  height: 1em;
  min-width: 1em;
  align-self: center;
  box-sizing: border-box;
`;

// endregion

export default function _IconSvg({
  fixedSize,
  viewBox,
  svgClassName,
  children,
  size,
  color,
  ...props
}) {
  return (
    <StyledSpan {...props} fixedSize={fixedSize} size={size} color={color}>
      <StyledSvg
        viewBox={viewBox}
        className={svgClassName}
        xmlns='http://www.w3.org/2000/svg'
      >
        {children}
      </StyledSvg>
    </StyledSpan>
  );
}

_IconSvg.propTypes = {
  fixedSize: PropTypes.bool,
  viewBox: PropTypes.string,
  svgClassName: PropTypes.string,
};

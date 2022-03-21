import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';

const IconButtonWrap = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ size }) =>
    size === 'xs'
      ? `
    font-size: 16px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  `
      : size === 'sm'
      ? `
    font-size: 20px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
  `
      : size === 'lg'
      ? `
    font-size: 32px;
    width: 40px;
    height: 40px;
    border-radius: 40px;
      `
      : `
    font-size: 24px;
    width: 32px;
    height: 32px;
    border-radius: 16px;
  `}

  color: ${({ theme, color, active }) =>
    active || color === 'primary'
      ? theme.color.primary
      : theme.color.textPrimary};
  background-color: transparent;
  border: 0;
  outline: 0;
  box-shadow: 0 0 0 0 transparent;
  transition: 150ms;

  ${({ theme, active }) => `
    &:hover {
      background-color: ${active ? theme.color.highlight : theme.color.gray03};
    }
    &:focus {
      background-color: ${active ? theme.color.highlight : theme.color.gray05};
    }
    &:active {
      background-color: ${
        active ? theme.color.highlightActive : theme.color.gray05
      };
      box-shadow: 0 0 0 4px
        ${active ? theme.color.highlight : theme.color.gray03};
    }
    &:disabled {
      color: ${theme.color.disabled};
      background-color: transparent;
      box-shadow: 0 0 0 0 transparent;
      cursor: not-allowed;
    }
  `}
`;

const IconButton = ({
  type,
  size = 'md',
  loading,
  disabled,
  iconProps,
  color,
  ...props
}) => {
  return (
    <IconButtonWrap
      {...props}
      color={loading ? undefined : color}
      type='button'
      disabled={disabled}
      size={size}
    >
      <Icon type={type} fixedSize {...iconProps} />
    </IconButtonWrap>
  );
};

export default IconButton;

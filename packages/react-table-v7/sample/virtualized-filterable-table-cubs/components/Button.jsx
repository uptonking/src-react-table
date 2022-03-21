import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';

const StyledButton = styled.button`
  ${({ variant, color, size, theme, hasIcon, hasText }) => `
    padding: ${
      hasIcon && !hasText
        ? theme.button.paddingTopBottom
        : `${theme.button.paddingTopBottom} ${theme.button.paddingSides}`
    };
    font-size: ${size === 'small' ? 11 : 13}px;
    ${
      size === 'small'
        ? `
          padding: ${
            hasIcon && !hasText
              ? theme.button.small.paddingTopBottom
              : `${theme.button.small.paddingTopBottom} ${theme.button.small.paddingSides}`
          };
    `
        : ``
    };
    min-height: ${
      size === 'small' ? theme.button.small.minHeight : theme.button.minHeight
    };
    border: none;
    border-radius: ${theme.button.borderRadius};
    white-space: nowrap;
    user-select: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    transition: 100ms;
    position: relative;
    outline: none;
    font-family: 'Open Sans', sans-serif;
    line-height: 0.95;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
      &:before,
      &:after {
        display: none;
      }
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 1;
      transition: 100ms;
      border-radius: ${theme.button.borderRadius};
    }

    &:hover:before {
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
      border-radius: calc(${theme.button.borderRadius} - 1px);
    }

    &:active:before {
      opacity: 0;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      color: ${theme.button[color].color.light};
      opacity: 0;
      box-shadow: 0 0 0 0;
      opacity: 0;
      transition: 100ms;
      border-radius: ${theme.button.borderRadius};
    }

    &:focus:after {
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      box-shadow: 0 0 0 1px;
      opacity: 1;
      border-radius: ${
        Number(theme.button.borderRadius.replace('px', '')) + 2
      }px;
    }

    &:focus:active:after {
      box-shadow: 0 0 0 3px;
      opacity: 0.25;
    }
    
    ${
      variant === 'contained'
        ? `
      color: #ffffff;
      background: ${theme.button[color].color.default};
      &:before {
        background: linear-gradient(153.43deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 83.33%);
      }
      &:hover:not(:disabled),
      &:focus {
        background: ${theme.button[color].color.light};
      }
      &:active, &:focus:active {
        background: ${theme.button[color].color.default};
      }
      &:disabled {
        color: ${theme.button.default.color.default}99;
        background: ${theme.button.default.color.light}33;
      }
    `
        : `
      color: ${theme.button[color].color.default};
      background-color: transparent;
      &:hover:not(:disabled), 
      &:focus {
        background-color: ${theme.button[color].color.default}0f;
      }
      &:active, &:focus:active {
        background-color: ${theme.button[color].color.default}22;
      }
      &:focus:after {
        opacity: 0.5;
      }
      &:focus:active:after {
        opacity: 0.125;
      }
      &:disabled {
        color: ${theme.button.default.color.default}99;
      }
    `
    }
    ${
      variant === 'outlined'
        ? `
      box-shadow: inset 0 0 0 1px ${theme.button[color].color.default};
      background-color: ${theme.color.surface};
      &:before {
        background: linear-gradient(138.17deg, ${theme.button[color].color.default}00 12.7%, ${theme.button[color].color.default}33 106.8%);
        top: 1px;
        right: 1px;
        bottom: 1px;
        left: 1px;
        border-radius: calc(${theme.button.borderRadius} - 1px);
      }
      &:disabled {
        box-shadow: 0 0 0 0 transparent;
        background: ${theme.button.default.color.light}33;
      }
    `
        : ``
    }
  `}
`;

const StyledIcon = styled(Icon)`
  ${({ hasText, $size, theme }) =>
    hasText
      ? `
  margin-left: -${
    $size === 'small'
      ? theme.button.small.icon.offset
      : theme.button.icon.offset
  };
  margin-right: ${
    $size === 'small'
      ? theme.button.small.icon.spacing
      : theme.button.icon.spacing
  };
  `
      : ``};
  font-size: ${({ $size, theme }) =>
    $size === 'small'
      ? theme.button.small.icon.fontSize
      : theme.button.icon.fontSize};

  pointer-events: none;
`;

const StyledTextAndIndicatorWrapper = styled.div`
  display: inline-flex;
  pointer-events: none;
`;

const Button = React.forwardRef(function (
  {
    size,
    iconType,
    loading,
    loadingLabel,
    formOperation,
    autoFocus,
    disabled,
    form,
    formContext,
    name,
    type,
    value,
    color = 'default',
    variant = 'ghost',
    onClick,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <StyledButton
      {...props}
      className={className}
      ref={ref}
      autoFocus={autoFocus}
      disabled={disabled || loading}
      name={name}
      type={type}
      value={value}
      size={size}
      color={color}
      variant={variant}
      hasIcon={iconType != null}
      hasText={!!children}
      onClick={
        formOperation
          ? (e, ...restOfArgs) => {
              if (e.target.form != null) {
                e.target.form.__operation__ = formOperation;
              }

              onClick?.(e, ...restOfArgs);
            }
          : onClick
      }
    >
      {iconType != null && (
        <StyledIcon
          hasText={!!children}
          type={iconType}
          $size={size}
          fixedSize
        />
      )}

      <StyledTextAndIndicatorWrapper>
        {loading ? loadingLabel || children : children}
      </StyledTextAndIndicatorWrapper>
    </StyledButton>
  );
});

Button.propTypes = {
  size: PropTypes.oneOf(['default', 'small']),
  iconType: PropTypes.string,
  loading: PropTypes.bool,
  loadingLabel: PropTypes.string,
  formOperation: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  form: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formContext: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
  variant: PropTypes.oneOf(['contained', 'outlined', 'ghost']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: 'default',
  type: 'button',
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RadioButton = styled.input.attrs(() => ({
  type: 'radio',
}))`
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  line-height: 1.4;
  color: inherit;
  margin: 0px;
  padding: 0px;
  appearance: none;
  border: 1px solid #878a8c;
  height: ${({ large, theme }) =>
    large ? theme.inputs.large.fontSize : theme.inputs.fontSize};
  width: ${({ large, theme }) =>
    large ? theme.inputs.large.fontSize : theme.inputs.fontSize};
  background-color: #878a8c;
  box-shadow: inset 0px 0px 0px
      ${({ large, theme }) =>
        large ? theme.inputs.large.fontSize : theme.inputs.fontSize}
      #ffffff,
    0 0 0 0 ${({ theme }) => theme.color.info40}44;
  background-repeat: no-repeat, no-repeat;
  background-position: 50% 50%, left top;
  border-radius: 50%;
  transition: 150ms;

  &:checked,
  &[type='checkbox']:indeterminate,
  &:focus {
    background-color: ${({ theme }) => theme.color.info40};
    border-color: ${({ theme }) => theme.color.info40};
  }

  &:focus {
    box-shadow: inset 0px 0px 0px
        ${({ large, theme }) =>
          large ? theme.inputs.large.fontSize : theme.inputs.fontSize}
        #ffffff,
      0 0 0 2px ${({ theme }) => theme.color.info40}44;
  }
  &:focus:active {
    box-shadow: inset 0px 0px 0px
        ${({ large, theme }) =>
          large ? theme.inputs.large.fontSize : theme.inputs.fontSize}
        #ffffff,
      0 0 0 4px #15739322;
  }

  &:checked {
    box-shadow: inset 0px 0px 0px ${({ large }) => (large ? `2.5px` : `2px`)}
        #ffffff,
      0 0 0 0 ${({ theme }) => theme.color.info40}44;
    &:focus {
      box-shadow: inset 0px 0px 0px ${({ large }) => (large ? `2.5px` : `2px`)}
          #ffffff,
        0 0 0 2px ${({ theme }) => theme.color.info40}44;
    }
    &:focus:active {
      box-shadow: inset 0px 0px 0px ${({ large }) => (large ? `2.5px` : `2px`)}
          #ffffff,
        0 0 0 4px #15739322;
    }
  }
`;

export const RadioButtonLabel = styled.label`
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  color: ${({ disabled, theme }) =>
    disabled && theme.inputs.disabled.textColor};
  font-size: ${({ large, theme }) =>
    large ? theme.inputs.large.fontSize : theme.inputs.fontSize};
  line-height: ${({ large, theme }) =>
    large ? theme.inputs.large.lineHeight : theme.inputs.lineHeight};
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LabeledRadioButton = ({
  children,
  className,
  id,
  large,
  ...props
}) => {
  return (
    <RadioOption className={className}>
      <RadioButton id={id} large={large} {...props} />
      <RadioButtonLabel htmlFor={id} large={large}>
        {children}
      </RadioButtonLabel>
    </RadioOption>
  );
};

RadioButton.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  value: PropTypes.any,

  checked: PropTypes.bool,

  large: PropTypes.bool,
  disabled: PropTypes.bool,

  onClick: PropTypes.func,
  onChange: PropTypes.func,

  required: PropTypes.bool,

  'data-qa': PropTypes.any,
};

export default RadioButton;

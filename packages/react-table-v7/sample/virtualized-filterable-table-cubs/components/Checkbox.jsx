import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import theme from '../theme';
// import Icon, { iconStyles } from './Icon';
import Icon from './Icon';

export const checkboxInputStyles = css`
  appearance: none;
  display: inline-block;
  height: ${({ large, theme }) =>
    large ? theme.inputs.large.fontSize : theme.inputs.fontSize};
  width: ${({ large, theme }) =>
    large ? theme.inputs.large.fontSize : theme.inputs.fontSize};
  min-width: 1em;
  min-height: 1em;
  z-index: 0;
  font-size: ${({ large }) =>
    large
      ? theme.inputs.checkbox.large.fontSize
      : theme.inputs.checkbox.fontSize};
  color: ${theme.color.textPrimary};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #878a8c;
  border-radius: 2px;
  background-color: #ffffff;
  transition: 150ms;
  box-shadow: 0 0 0 0 ${({ theme }) => theme.color.info40}44;
  position: relative;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.info40};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.info40}44;
  }
  &:focus:active {
    box-shadow: 0 0 0 4px #15739322;
  }

  &:hover {
    cursor: pointer;
  }

  &::after,
  &::before {
    /* iconStyles */
    content: '';
    z-index: 2;
    color: #ffffff;
    position: absolute;
    top: -0.05em; /* NOTE: Magic Number */
    left: -0.1em;
    font-size: ${theme.inputs.checkbox.size};
    transform: scale(0);
    transition: 150ms;
  }

  &:checked {
    background-color: ${({ theme }) => theme.color.info40};
    border-color: ${({ theme }) => theme.color.info60};
  }

  &::after {
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    background-image: url('data:image/svg+xml;utf8,${_getCheckmarkSvg(
      theme.color.white,
    )}');
  }
  &:checked:not(:indeterminate)::after,
  &:indeterminate::before {
    transform: scale(1);
  }

  &::before {
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    background-image: url('data:image/svg+xml;utf8,${_getIndeterminateSvg(
      theme.color.text,
    )}');
  }

  &:disabled {
    cursor: default;

    border-color: ${theme.inputs.disabled.borderColor};
    background: ${theme.inputs.disabled.bgColor};

    &::after {
      color: ${theme.inputs.disabled.textColor};
    }
    &::before {
      background-image: url('data:image/svg+xml;utf8,${_getIndeterminateSvg(
        theme.inputs.disabled.textColor,
      )}');
    }
  }
`;

function _getIndeterminateSvg(fillColor) {
  return `\
    <svg viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg' version='1.1'>\
      <path fill='${encodeURIComponent(
        fillColor,
      )}' d='M 9.6044458,7.263 H 4.0955541 C 3.8894614,7.263 3.7136824,7.1872 3.5682168,7.03569 3.4227389,6.88415 3.35,6.70535 3.35,6.49927 3.35,6.29317 3.422739,6.11437 3.5682168,5.96283 3.7136824,5.81129 3.8894614,5.73552 4.0955541,5.73552 h 5.5088917 c 0.2060928,0 0.3818712,0.0758 0.5273372,0.22731 C 10.277261,6.11437 10.35,6.29317 10.35,6.49927 10.35,6.70535 10.27726,6.88415 10.131783,7.03569 9.986317,7.18723 9.8105386,7.263 9.6044458,7.263 Z' />\
    </svg>\
  `;
}

function _getCheckmarkSvg(fillColor) {
  return `\
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' version='1.1'>\
      <path fill='${encodeURIComponent(
        fillColor,
      )}' d='M5.96169 12.6554C5.91615 12.6845 5.87238 12.7178 5.83088 12.7552C5.42045 13.1247 5.38731 13.757 5.75686 14.1674L8.55657 17.2768C8.62209 17.3496 8.69587 17.4105 8.7752 17.4594C9.15526 17.6981 9.66273 17.6575 10.0005 17.3321L18.1391 9.5C18.5368 9.11678 18.5485 8.48373 18.1653 8.08603C17.7821 7.68833 17.149 7.6766 16.7513 8.05981L9.35598 15.1757L7.24315 12.8292C7.07017 12.6371 6.83961 12.5276 6.60119 12.5034C6.57514 12.4977 6.54869 12.4933 6.52193 12.4903C6.32297 12.4682 6.12336 12.526 5.967 12.651C5.96522 12.6525 5.96345 12.6539 5.96169 12.6554Z' />\
    </svg>\
  `;
}

const StyledInput = styled.input`
  ${checkboxInputStyles};
`;

export const CheckboxLabel = styled.label`
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  color: ${({ disabled, theme }) =>
    disabled && theme.inputs.disabled.textColor};
  font-size: ${({ large, theme }) =>
    large ? theme.inputs.large.fontSize : theme.inputs.fontSize};
  line-height: ${({ large, theme }) =>
    large ? theme.inputs.large.lineHeight : theme.inputs.lineHeight};
`;

const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LabeledCheckbox = ({
  children,
  className,
  id,
  large,
  ...props
}) => {
  return (
    <CheckboxWrap className={className}>
      <Checkbox id={id} large={large} {...props} />
      <CheckboxLabel htmlFor={id} large={large}>
        {children}
      </CheckboxLabel>
    </CheckboxWrap>
  );
};

export default class Checkbox extends React.PureComponent {
  static propTypes = {
    large: PropTypes.bool,
    readOnlyYesNo: PropTypes.bool,
    uncontrolled: PropTypes.bool,
    disableEnterKeyDefault: PropTypes.bool,
    useSymbolForReadOnlyUnchecked: PropTypes.bool,
    autoFocus: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    readOnly: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    valueToYN: PropTypes.bool,
  };

  _readOnlyKey = uuidV4();
  _inputKey = uuidV4();

  _inputRef = React.createRef();

  render() {
    if (this.props.readOnly) {
      return this._isChecked() || this.props.useSymbolForReadOnlyUnchecked ? (
        <Icon
          key={this._readOnlyKey}
          type={this._isChecked() ? 'check-mark' : 'ban'}
          fixedSize
        />
      ) : (
        <span key={this._readOnlyKey}>&nbsp;</span>
      );
    }

    const { className, ...props } = this.props;

    if (this.props.readOnlyYesNo) {
      return (
        <span className={className} key={this._readOnlyKey}>
          {this._isChecked() ? 'Yes' : 'No'}
        </span>
      );
    }

    const checkedProps = {};

    if (this.props.uncontrolled) {
      checkedProps.defaultChecked = this.props.defaultChecked;
    } else {
      checkedProps.checked = this.props.checked;
    }

    return (
      <StyledInput
        {...checkedProps}
        ref={this._inputRef}
        key={this._inputKey}
        type='checkbox'
        autoFocus={this.props.autoFocus}
        className={className}
        disabled={this.props.disabled}
        name={this.props.name}
        readOnly={this.props.readOnly}
        large={this.props.large}
        tabIndex={this.props.tabIndex}
        onChange={!this.props.disabled ? this._onChange : undefined}
        disableEnterKeyDefault={this.props.disableEnterKeyDefault}
      />
    );
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this._inputRef.current != null) {
      this._inputRef.current.indeterminate = Boolean(
        !this._isChecked() && this.props.indeterminate,
      );
    }
  }

  _onChange = (e) => {
    e.stopPropagation();

    if (
      !this.props.readOnly &&
      !this.props.readOnlyYesNo &&
      !this.props.disabled
    ) {
      let isChecked = this.props.uncontrolled
        ? e.target.checked
        : !this.props.checked;
      if (this.props.valueToYN) isChecked = isChecked ? 'Y' : 'N';
      return this.props.onChange
        ? this.props.onChange(e, isChecked, this.props.id, this.props.name)
        : undefined;
    }
  };

  _isChecked() {
    return (
      (this.props.uncontrolled && this.props.defaultChecked) ||
      (!this.props.uncontrolled &&
        (this.props.checked === true || this.props.checked === 'Y'))
    );
  }
}

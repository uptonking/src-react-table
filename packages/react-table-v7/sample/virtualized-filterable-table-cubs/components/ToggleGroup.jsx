import React from 'react';
import styled from 'styled-components';

const ToggleGroupWrap = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.inputs.borderColor};
  border-radius: 2px;
  height: 1.5rem;
  box-sizing: border-box;
`;
const Option = styled.div`
  flex: 1;
  padding: 4px;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  ${({ active, theme }) =>
    active
      ? `
    color: ${theme.color.primary};
    background: ${theme.color.primaryHighlight};
  `
      : ``}

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.inputs.borderColor};
  }
`;

const ToggleGroup = ({ options, value, onChange }) => {
  return (
    <ToggleGroupWrap>
      {options?.map((option) => (
        <Option
          onClick={() => onChange(option.value || option.label)}
          active={option.value === value || option.label === value}
        >
          {option.label || option.value}
        </Option>
      ))}
    </ToggleGroupWrap>
  );
};

export default ToggleGroup;

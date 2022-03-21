import styled from 'styled-components';

import Icon from './Icon';
import { inputStyles } from './Input';

const SelectWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
`;
const SelectInput = styled.select`
  ${inputStyles}
  appearance: none;
`;
const SelectIndicator = styled(Icon)`
  position: absolute;
  top: 4px;
  right: 4px;
  pointer-events: none;
`;

const Select = ({ value, options, onChange, ...props }) => {
  return (
    <SelectWrap>
      <SelectInput value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, i) => (
          <option key={`select-option-${i}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectInput>
      <SelectIndicator type='chevron-down' />
    </SelectWrap>
  );
};

export default Select;

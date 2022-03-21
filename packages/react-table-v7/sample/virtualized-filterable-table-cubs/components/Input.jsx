import styled, { css } from 'styled-components';

export const inputStyles = css`
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.inputs.borderColor};
  border-radius: 2px;
  transition: 150ms;
  padding-left: 10px;
  font-size: 12px;
  line-height: 16px;
  height: 24px;
  color: #212225;
  outline: none;
  box-sizing: border-box;
  max-width: 100%;
  &:focus {
    box-shadow: 0 0 0 4px #15749333;
    border: 1px solid #157493;
  }
  &:disabled {
    color: ${({ theme }) => theme.inputs.disabled.textColor};
    background: ${({ theme }) => theme.inputs.disabled.bgColor};
    border: 1px solid ${({ theme }) => theme.inputs.disabled.borderColor};
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

export default Input;

import styled from 'styled-components';

const MenuDivider = styled.hr`
  margin: 4px -4px 4px -4px;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

export default MenuDivider;

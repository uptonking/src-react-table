import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import Menu from './Menu';

export const MenuItemWrap = styled.div`
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 200ms;
  display: flex;
  align-items: center;
  border-radius: 2px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  ${({ selected, theme }) =>
    selected ? `background-color: ${theme.color.highlight};` : ``}
    ${({ disabled, type, theme }) =>
      disabled
        ? `
      opacity: 0.5;
      cursor: not-allowed;
    `
        : `
      &:hover {
        background-color: ${({ theme }) => theme.color.highlight};
        ${
          type === 'danger'
            ? `
          background-color: ${theme.color.dangerHighlight};
          color: ${theme.color.danger};
        `
            : ``
        }
        ${
          type === 'success'
            ? `
            background-color: ${theme.color.successHighlight};
          color: ${theme.color.success};
        `
            : ``
        }
    `}

  }
  ${({ theme }) => theme.responsive.mediaQueryDown('xs')} {
    color: ${({ theme, type }) =>
      type === 'danger'
        ? theme.color.danger
        : type === 'success'
        ? theme.color.success
        : theme.color.primary};
  }
`;
const TextWrap = styled.div`
  flex: 1;
`;
const StyledIcon = styled(Icon)`
  margin-right: 0.75rem;
`;
const SelectedIcon = styled(Icon)`
  margin-left: 0.75rem;
`;
const MoreIcon = styled(Icon)`
  margin-left: 0.75rem;
  margin-right: -0.25rem;
`;

const MenuItem = ({
  children,
  icon,
  onClick,
  selected,
  type,
  submenu,
  disabled,
  className,
  ...props
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState();

  return (
    <MenuItemWrap
      onClick={disabled ? undefined : onClick}
      type={type}
      className={className}
      onMouseEnter={
        disabled
          ? undefined
          : (e) => {
              e.stopPropagation();
              setMenuAnchorEl(e.currentTarget);
            }
      }
      onMouseLeave={(e) => {
        e.stopPropagation();
        setMenuAnchorEl(null);
      }}
      selected={!!menuAnchorEl}
      disabled={disabled}
      {...props}
    >
      {icon && <StyledIcon type={icon} size='xs' />}
      <TextWrap>{children}</TextWrap>
      {selected && <SelectedIcon type='check-mark' size='xs' />}
      {submenu && (
        <>
          <MoreIcon type='chevron-right' size='xs' />
          <Menu
            anchorEl={menuAnchorEl}
            open={!!menuAnchorEl}
            onClose={() => setMenuAnchorEl(null)}
            placement='right-start'
          >
            {typeof submenu === 'function'
              ? submenu(() => setMenuAnchorEl(null))
              : submenu}
          </Menu>
        </>
      )}
    </MenuItemWrap>
  );
};

export default MenuItem;

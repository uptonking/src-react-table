import React from 'react';
import styled from 'styled-components';
import Popper from '../Popper';
import { isWindowDown } from '../../utils/responsive';
import { MenuItemWrap } from './MenuItem';
import Grow from '../transitions/Grow';
import Slide from '../transitions/Slide';
import ClickAwayListener from '../ClickAwayListener';
import theme from '../../theme';

const MenuWrap = styled.div`
  background: ${({ theme }) => theme.color.elevatedSurface};
  box-shadow: 0 0 4px 1px
      ${({ theme }) =>
        theme.darkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(14, 30, 37, 0.06)'},
    0 ${({ isMobile }) => (isMobile ? '-' : '')}8px 16px 0
      ${({ theme }) =>
        theme.darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(14, 30, 37, 0.2)'};
  border-radius: ${({ isMobile }) => (isMobile ? 0 : '4px')};
  padding: ${({ isMobile }) => (isMobile ? '0.5rem' : '0.25rem')};
  min-width: ${({ width }) => (width ? width : '200px')};
  & > ${MenuItemWrap} {
    ${({ isMobile }) => (isMobile ? `padding: 0.75rem;` : ``)}
  }
  @media (display-mode: standalone) {
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const Menu = React.forwardRef(function Menu(props, ref) {
  const {
    autoFocus: autoFocusProp,
    children,
    classes,
    className,
    onClose,
    onEntering,
    open,
    transitionDuration = 250,
    TransitionComponent = Grow,
    TransitionProps = {},
    placement,
    width,
    anchorEl,

    onEnter,
    onEntered,
    onExit,
    onExiting,
    onExited,
    role,
    style,
    offset,

    ...other
  } = props;
  const isMobile = isWindowDown('xs');

  const MenuTransitionComponent = isMobile ? Slide : TransitionComponent;
  const MenuTransitionProps = isMobile ? { direction: 'up' } : TransitionProps;

  const handleClickAway = (e) => {
    if (onClose && e.target !== anchorEl && !anchorEl?.contains?.(e.target)) {
      onClose();
    }
  };

  return (
    <Popper
      anchorEl={anchorEl}
      onClose={onClose}
      placement={placement}
      open={open}
      popperRef={ref}
      transition
      style={{ zIndex: theme.zIndex.menus }}
      {...other}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener
          mouseEvent='onMouseDown'
          touchEvent='onTouchStart'
          onClickAway={handleClickAway}
        >
          <MenuTransitionComponent
            {...MenuTransitionProps}
            {...TransitionProps}
            timeout={transitionDuration}
          >
            <MenuWrap
              onClick={(e) => e.stopPropagation()}
              isMobile={isMobile}
              className={className}
              width={width}
            >
              {children}
            </MenuWrap>
          </MenuTransitionComponent>
        </ClickAwayListener>
      )}
    </Popper>
  );
});

export default Menu;

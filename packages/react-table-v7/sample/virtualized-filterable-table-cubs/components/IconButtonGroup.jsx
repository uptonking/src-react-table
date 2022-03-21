import React, { useState } from 'react';
import styled from 'styled-components';

import IconButton from './IconButton';
import { Menu, MenuDivider, MenuItem } from './Menu';

const IconButtonGroupWrap = styled.div`
  display: flex;
  gap: 12px;
  ${({ reverse }) => (reverse ? `flex-direction: row-reverse;` : ``)}
`;

const IconButtonGroup = ({
  actions = [],
  limit = 3,
  size = 'sm',
  disabled = false,
  reverse = false,
}) => {
  const [menuAnchors, setMenuAnchors] = useState({});
  const sortedActions = actions
    .sort(({ priority: a = 9999 }, { priority: b = 9999 }) => a - b)
    .map((action, i) => (action.id ? action : `action-${i}`));

  return (
    <IconButtonGroupWrap reverse={reverse}>
      {sortedActions
        .filter(
          (action, i) => i + 1 <= (actions.length > limit ? limit - 1 : limit),
        )
        .map((action, i) => (
          <React.Fragment key={action.id}>
            <IconButton
              type={action.icon}
              title={action.label}
              size={size}
              disabled={disabled || action.disabled}
              onClick={(e) => {
                if (action.onClick && typeof action.onClick === 'function') {
                  action.onClick(e);
                }
                if (action.menuItems?.length) {
                  setMenuAnchors((anchors) => ({
                    ...anchors,
                    [action.id]: anchors[action.id] ? null : e.currentTarget,
                  }));
                }
              }}
            />
            {!!action.menuItems?.length && (
              <Menu
                anchorEl={menuAnchors[action.id]}
                open={!!menuAnchors[action.id]}
                onClose={() =>
                  setMenuAnchors((anchors) => ({
                    ...anchors,
                    [action.id]: null,
                  }))
                }
                placement='bottom-start'
              >
                {action.menuItems.map((subAction) => (
                  <MenuItem
                    icon={subAction.icon}
                    onClick={(e) => {
                      subAction.onClick && subAction.onClick(e);
                      setMenuAnchors((anchors) => ({
                        ...anchors,
                        [action.id]: null,
                      }));
                    }}
                    selected={subAction.selected}
                  >
                    {subAction.label}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </React.Fragment>
        ))}
      {actions.length > limit && (
        <>
          <IconButton
            type='more-menu'
            title='More Actions'
            size={size}
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchors((anchors) => ({
                ...anchors,
                more: anchors['more'] ? null : e.currentTarget,
              }));
            }}
          />
          <Menu
            anchorEl={menuAnchors['more']}
            open={!!menuAnchors['more']}
            onClose={() =>
              setMenuAnchors((anchors) => ({ ...anchors, more: null }))
            }
            placement='bottom-start'
          >
            {sortedActions
              .filter(
                (action, i) =>
                  i + 1 > (actions.length > limit ? limit - 1 : limit),
              )
              .map((action) => (
                <MenuItem
                  icon={action.icon}
                  onClick={(e) => {
                    if (action.onClick) action.onClick(e);
                    if (!action.menuItems?.length) {
                      setMenuAnchors((anchors) => ({ ...anchors, more: null }));
                    }
                  }}
                  disabled={action.disabled}
                  submenu={
                    action.menuItems?.length
                      ? (closeSubmenu) => (
                          <>
                            {action.menuItems.map((subAction) => (
                              <MenuItem
                                icon={subAction.icon}
                                onClick={(e) => {
                                  subAction.onClick && subAction.onClick(e);
                                  closeSubmenu();
                                  setMenuAnchors((anchors) => ({
                                    ...anchors,
                                    more: null,
                                  }));
                                }}
                                selected={subAction.selected}
                              >
                                {subAction.label}
                              </MenuItem>
                            ))}
                          </>
                        )
                      : undefined
                  }
                >
                  {action.label}
                </MenuItem>
              ))}
          </Menu>
        </>
      )}
    </IconButtonGroupWrap>
  );
};

export default IconButtonGroup;

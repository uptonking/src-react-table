import React, { useState } from 'react';
import styled from 'styled-components';

import { LabeledCheckbox } from '../Checkbox';
import { Menu, MenuDivider, MenuItem, MenuTab, MenuTabs } from '../Menu';
import { useTableContext } from '.';

const ColumnCheckboxes = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 4px;
`;

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 8px;
  hr {
    width: calc(100% + 16px);
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    margin: 0 -8px;
  }
`;

const ColumnHeaderMenu = ({ menuAnchorEl, onClose, index, column }) => {
  const {
    allColumns,
    visibleColumns,
    leftPinnedColumnIds,
    setLeftPinnedColumnIds,
    rightPinnedColumnIds,
    setRightPinnedColumnIds,
    reorder,
  } = useTableContext();
  const [selectedTab, setSelectedTab] = useState('filter');
  const { id } = column;

  return (
    <Menu
      anchorEl={menuAnchorEl}
      open={!!menuAnchorEl}
      onClose={onClose}
      placement='bottom-end'
    >
      <MenuTabs selectedValue={selectedTab} onClickTabHeader={setSelectedTab}>
        <MenuTab value='filter' icon='filter'>
          <FilterForm>
            {column.canFilter && column.Filter ? column.render('Filter') : null}
          </FilterForm>
        </MenuTab>
        <MenuTab value='options' icon='options'>
          <MenuItem
            submenu={(closeSubmenu) => (
              <>
                <MenuItem
                  selected={
                    !leftPinnedColumnIds.includes(id) &&
                    !rightPinnedColumnIds.includes(id)
                  }
                  onClick={() => {
                    if (leftPinnedColumnIds.includes(id)) {
                      setLeftPinnedColumnIds(
                        leftPinnedColumnIds.filter((colId) => colId !== id),
                      );
                    }
                    if (rightPinnedColumnIds.includes(id)) {
                      setRightPinnedColumnIds(
                        rightPinnedColumnIds.filter((colId) => colId !== id),
                      );
                    }
                    onClose();
                    closeSubmenu();
                  }}
                >
                  None
                </MenuItem>
                <MenuItem
                  selected={leftPinnedColumnIds.includes(id)}
                  onClick={() => {
                    if (!leftPinnedColumnIds.includes(id)) {
                      reorder(
                        { id, index, header: column.Header },
                        leftPinnedColumnIds.length,
                      );
                      setLeftPinnedColumnIds([...leftPinnedColumnIds, id]);
                    }
                    if (rightPinnedColumnIds.includes(id)) {
                      setRightPinnedColumnIds(
                        rightPinnedColumnIds.filter((colId) => colId !== id),
                      );
                    }
                    onClose();
                    closeSubmenu();
                  }}
                >
                  Left
                </MenuItem>
                <MenuItem
                  selected={rightPinnedColumnIds.includes(id)}
                  onClick={() => {
                    if (!rightPinnedColumnIds.includes(id)) {
                      reorder(
                        { id, index, header: column.Header },
                        visibleColumns.length - rightPinnedColumnIds.length - 1,
                      );
                      setRightPinnedColumnIds([...rightPinnedColumnIds, id]);
                    }
                    if (leftPinnedColumnIds.includes(id)) {
                      setLeftPinnedColumnIds(
                        leftPinnedColumnIds.filter((colId) => colId !== id),
                      );
                    }
                    onClose();
                    closeSubmenu();
                  }}
                >
                  Right
                </MenuItem>
              </>
            )}
          >
            Pin Column
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => onClose()}>Autosize this Column</MenuItem>
          <MenuItem onClick={() => onClose()}>Autosize all Columns</MenuItem>
        </MenuTab>
        <MenuTab value='columns' icon='columns'>
          <ColumnCheckboxes>
            {allColumns
              .filter((column) => typeof column.Header === 'string')
              .map((column, i) => (
                <LabeledCheckbox
                  key={`menu-item-${i}`}
                  {...column.getToggleHiddenProps()}
                >
                  {column.Header}
                </LabeledCheckbox>
              ))}
          </ColumnCheckboxes>
        </MenuTab>
      </MenuTabs>
    </Menu>
  );
};

export default ColumnHeaderMenu;

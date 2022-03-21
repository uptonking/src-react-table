import React from 'react';
import styled from 'styled-components';

import Badge from '../Badge';
import IconButton from '../IconButton';
import IconButtonGroup from '../IconButtonGroup';
import GlobalFilter from './GlobalFilter';
import { useTableContext } from './Table';

const TableHeaderWrap = styled.header`
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 56px;
  gap: 12px;
  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    &:last-child {
      justify-content: flex-end;
    }
  }
`;
const TableHeaderStart = styled.div``;
const TableHeaderEnd = styled.div``;
const TableTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;
const IconButtonWrap = styled.div`
  margin: 0 0 0 -6px !important;
`;
const CollapseButton = styled(IconButton)`
  margin: 0 0 0 -6px !important;
  & > * {
    transition: ${({ transitionDuration }) => transitionDuration}ms;
    transform: rotate(${({ collapsed }) => (collapsed ? 0 : 90)}deg);
  }
`;

const TableHeader = () => {
  const {
    actions,
    actionsLimit,
    collapsible,
    disableClearFilters,
    disableClearFiltersButton,
    disableDensity,
    disableDensityButton,
    disableExport,
    disableExportButton,
    disableGlobalFilter,
    disableGlobalFilterInput,
    disableRefreshDataButton,
    disableReset,
    disableResetButton,
    disableRowCount,
    handleCollapseToggle,
    handleGlobalFilterChange,
    isCollapsed,
    loading,
    onRefreshData,
    preGlobalFilteredRows,
    renderHeaderIconButton,
    renderPrimaryActions,
    resetTable,
    rowDensity,
    rows,
    setGlobalFilter,
    setRowDensity,
    state,
    title,
    transitionDuration,
  } = useTableContext();

  return (
    <TableHeaderWrap>
      <TableHeaderStart>
        {!collapsible &&
          renderHeaderIconButton &&
          typeof renderHeaderIconButton === 'function' && (
            <IconButtonWrap>{renderHeaderIconButton()}</IconButtonWrap>
          )}
        {collapsible && (
          <CollapseButton
            type='chevron-right'
            collapsed={isCollapsed}
            transitionDuration={transitionDuration}
            onClick={handleCollapseToggle}
          />
        )}
        <TableTitle>{title || 'Results'}</TableTitle>
        {!disableRowCount && <Badge>{rows.length}</Badge>}
      </TableHeaderStart>
      <TableHeaderEnd>
        <IconButtonGroup
          actions={[
            ...(!!onRefreshData
              ? [
                  {
                    id: 'refreshData',
                    icon: 'refresh',
                    label: 'Refresh Data',
                    onClick: onRefreshData,
                    disabled: disableRefreshDataButton,
                  },
                ]
              : []),
            ...(!disableReset
              ? [
                  {
                    id: 'resetTable',
                    icon: 'table-reset',
                    label: 'Reset Table',
                    onClick: resetTable,
                    disabled: disableResetButton,
                  },
                ]
              : []),
            ...(!disableClearFilters
              ? [
                  {
                    id: 'filters',
                    icon: 'filter-remove',
                    label: 'Clear Filters',
                    onClick: () => console.log('Clicked'),
                    disabled: disableClearFiltersButton,
                  },
                ]
              : []),
            ...(!disableExport
              ? [
                  {
                    id: 'exportData',
                    icon: 'page-arrow',
                    label: 'Export Data',
                    onClick: () => console.log('Export Data'),
                    disabled: disableExportButton,
                    priority: 1,
                  },
                ]
              : []),
            ...(!disableDensity
              ? [
                  {
                    id: 'rowDensity',
                    icon: 'row-size',
                    label: 'Row Density',
                    // onClick: () => console.log("Row Density"),
                    menuItems: [
                      {
                        id: 'default',
                        label: 'Default',
                        onClick: () => setRowDensity('default'),
                        selected: rowDensity === 'default',
                      },
                      {
                        id: 'comfortable',
                        label: 'Comfortable',
                        onClick: () => setRowDensity('comfortable'),
                        selected: rowDensity === 'comfortable',
                      },
                      {
                        id: 'compact',
                        label: 'Compact',
                        onClick: () => setRowDensity('compact'),
                        selected: rowDensity === 'compact',
                      },
                    ],
                    disabled: disableDensityButton,
                  },
                ]
              : []),
            ...actions,
          ]}
          limit={actionsLimit}
          disabled={loading}
          reverse
        />
        {renderPrimaryActions
          ? typeof renderPrimaryActions === 'function'
            ? renderPrimaryActions()
            : renderPrimaryActions
          : null}
        {!disableGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            onChange={handleGlobalFilterChange}
            disabled={disableGlobalFilterInput || loading}
            title={title}
          />
        )}
      </TableHeaderEnd>
    </TableHeaderWrap>
  );
};

export default TableHeader;

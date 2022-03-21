import React from 'react';
import styled from 'styled-components';

import ColumnHeader from './ColumnHeader';
import DraggedColumnHeaderPreview from './DraggedColumnHeaderPreview';
import { useTableContext } from '.';

const ColumnHeaderGroups = styled.div`
  background: #157493;
  color: white;
  overflow: auto;
  position: relative;
  z-index: 5;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
const ColumnHeaderGroup = styled.div`
  display: flex;
  min-width: 100%;
`;
const ScrollbarSpacer = styled.div`
  ${({ scrollbarWidth }) =>
    scrollbarWidth
      ? `width: ${scrollbarWidth}px; min-width: ${scrollbarWidth}px; max-width: ${scrollbarWidth}px;`
      : ``}
`;
const LeftPinnedColumnsShadow = styled.div`
  position: sticky;
  min-width: 8px;
  margin-right: -8px;
  background-image: linear-gradient(to right, #00000010, #00000000);
  pointer-events: none;
  z-index: 1;
`;
const RightPinnedColumnsShadow = styled.div`
  position: sticky;
  min-width: 8px;
  margin-left: -8px;
  background-image: linear-gradient(to left, #00000010, #00000000);
  pointer-events: none;
  z-index: 1;
`;

const ColumnHeaders = () => {
  const {
    theadRef,
    headerGroups,
    draggedHeader,
    visibleColumns,
    resizingColumnId,
    scrollbarWidth,
    columnDimensions,
    leftPinnedColumnIds,
    rightPinnedColumnIds,
    state,
  } = useTableContext();

  return (
    <ColumnHeaderGroups ref={theadRef}>
      {headerGroups.map((headerGroup) => (
        <ColumnHeaderGroup {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, i) => {
            const isGroup = column.columns && column.columns.length;

            return (
              <React.Fragment key={column.id}>
                {!column.placeholderOf &&
                  leftPinnedColumnIds.length > 0 &&
                  leftPinnedColumnIds.length === i && (
                    <LeftPinnedColumnsShadow
                      style={{ left: columnDimensions[i]?.left }}
                    />
                  )}
                <ColumnHeader
                  key={column.id}
                  column={column}
                  columns={headerGroup.headers}
                  index={
                    isGroup || true ? i : state.columnOrder.indexOf(column.id)
                  }
                  isGroup={isGroup}
                  isPlaceholder={column.placeholderOf}
                />
                {!column.placeholderOf &&
                  rightPinnedColumnIds.length > 0 &&
                  visibleColumns.length - rightPinnedColumnIds.length ===
                    i + 1 && (
                    <RightPinnedColumnsShadow
                      style={{ right: columnDimensions[i]?.right }}
                    />
                  )}
              </React.Fragment>
            );
          })}
          {scrollbarWidth > 0 && (
            <ScrollbarSpacer scrollbarWidth={scrollbarWidth} />
          )}
        </ColumnHeaderGroup>
      ))}
      {!resizingColumnId && (
        <DraggedColumnHeaderPreview draggedHeader={draggedHeader} />
      )}
    </ColumnHeaderGroups>
  );
};

export default ColumnHeaders;

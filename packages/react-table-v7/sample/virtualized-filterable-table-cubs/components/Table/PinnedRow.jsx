import React from 'react';
import styled from 'styled-components';

import { useTableContext } from '.';

const RowWrapGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  /* overflow: auto; */
  scrollbar-width: none;
  box-shadow: 0 0 4px 1px rgb(14 30 37 / 6%), 0 0 16px 0 rgb(14 30 37 / 20%);
  position: sticky;
  z-index: 2;
  min-width: 100%;
  background: white;
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
const RowWrap = styled.div`
  display: flex;
  min-width: 100%;
  &.even {
    background: #f7f8f8;
  }
  &.selected {
    background: #e9f7fc;
  }
`;

const Cell = styled.div`
  color: #212225;
  border-right: 1px solid #e0e2e2;
  margin: 0;
  padding: 8px 10px;
  overflow: hidden;
  background: white;
  ${RowWrap}.even & {
    background: #f7f8f8;
  }
  ${RowWrap}.selected & {
    background: #e9f7fc;
  }
  .align-end {
    text-align: end;
  }
  :first-child {
    padding-left: 20px;
  }
  :last-child {
    border-right: 0;
    padding-right: 20px;
  }
`;
const LeftPinnedColumnsShadow = styled.div`
  position: sticky;
  width: 8px;
  margin-right: -8px;
  background-image: linear-gradient(to right, #00000010, #00000000);
  pointer-events: none;
`;
const RightPinnedColumnsShadow = styled.div`
  position: sticky;
  width: 8px;
  margin-left: -8px;
  background-image: linear-gradient(to left, #00000010, #00000000);
  pointer-events: none;
`;

const PinnedRow = ({ style, pinnedRowRef, componentKey }) => {
  const {
    rows,
    preFilteredRows,
    cellProps,
    prepareRow,
    columnDimensions,
    leftPinnedColumnIds,
    rightPinnedColumnIds,
    visibleColumns,
  } = useTableContext();
  const row = rows[0];

  if (!row || !componentKey) return null;

  prepareRow(row);

  return (
    <RowWrapGroup ref={pinnedRowRef} style={style}>
      <RowWrap>
        {row &&
          row.cells.map((cell, i) => {
            const cProps = cell.getCellProps(cellProps);

            const Component = cell.column[componentKey];

            const { id } = cell.column;

            return (
              <>
                {leftPinnedColumnIds.length > 0 &&
                  leftPinnedColumnIds.length === i && (
                    <LeftPinnedColumnsShadow
                      style={{ left: columnDimensions[i]?.left }}
                    />
                  )}
                <Cell
                  {...cProps}
                  style={{
                    ...cProps.style,
                    ...((i === 0 || i === row.cells.length - 1) &&
                    cProps.style.width
                      ? { width: `calc(${cProps.style.width} + 10px)` }
                      : {}),
                    ...((i === 0 || i === row.cells.length - 1) &&
                    cProps.style.minWidth
                      ? { minWidth: `calc(${cProps.style.minWidth} + 10px)` }
                      : {}),
                    ...((i === 0 || i === row.cells.length - 1) &&
                    cProps.style.maxWidth
                      ? { maxWidth: `calc(${cProps.style.maxWidth} + 10px)` }
                      : {}),
                    ...(leftPinnedColumnIds.includes(id)
                      ? {
                          position: 'sticky',
                          left: columnDimensions[i]?.left,
                          zIndex: 1,
                        }
                      : {}),
                    ...(rightPinnedColumnIds.includes(id)
                      ? {
                          position: 'sticky',
                          right: columnDimensions[i]?.right,
                          zIndex: 1,
                          borderLeft: '1px solid #e0e2e2',
                          marginLeft: -1,
                        }
                      : {}),
                  }}
                  className='td'
                >
                  {/* {cell.render("Cell")} */}
                  {Component && (
                    <Component rows={rows} preFilteredRows={preFilteredRows} />
                  )}
                </Cell>
                {rightPinnedColumnIds.length > 0 &&
                  visibleColumns.length - rightPinnedColumnIds.length ===
                    i + 1 && (
                    <RightPinnedColumnsShadow
                      style={{ right: columnDimensions[i]?.right }}
                    />
                  )}
              </>
            );
          })}
      </RowWrap>
    </RowWrapGroup>
  );
};

export default PinnedRow;

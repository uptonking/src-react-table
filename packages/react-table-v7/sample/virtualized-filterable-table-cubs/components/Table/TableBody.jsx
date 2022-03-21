import React, { useCallback } from 'react';
import { useVirtual } from 'react-virtual';
import styled from 'styled-components';

import Spinner from '../Spinner';
import PinnedRow from './PinnedRow';
import Row from './Row';
import { useTableContext } from './Table';

const TableBodyWrap = styled.div`
  min-width: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
`;
const TableBodyInside = styled.div`
  width: 100%;
  min-width: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  height: 0;
  touch-action: none;
  overflow: auto;
  .rows {
    min-width: 100%;
    position: relative;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;

    .row-group {
      display: flex;
      flex-direction: column;
      min-width: 100%;
      ${({ disableVirtualization }) =>
        disableVirtualization
          ? ``
          : `
        position: absolute;
        top: 0;
        left: 0;      
      `}
    }

    .row {
      display: flex;
      min-width: 100%;
    }
    .row.even {
      background: #f7f8f8;
    }
    .row.selected {
      background: #e9f7fc;
    }
    .row .cell {
      color: #212225;
      border-right: 1px solid #e0e2e2;
      border-bottom: 1px solid #e0e2e2;
      margin: 0;
      padding: ${({ rowDensity }) =>
          rowDensity === 'comfortable' ? 6 : rowDensity === 'compact' ? 4 : 8}px
        10px;
      overflow: hidden;
      background: white;

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
    }
    .row.even .cell {
      background: #f7f8f8;
    }
    .row.selected .cell {
      background: #e9f7fc;
    }
  }
`;
const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
`;
const LoadingWrap = styled(Placeholder)`
  position: absolute;
  top: 0;
  left: 0;
  background: #fafafaaa;
  z-index: 5;
  pointer-events: none;
`;
const Spacer = styled.div`
  flex: 1;
`;

const TableBody = () => {
  const {
    loading,
    rowDensity,
    rows,
    title,
    getTableBodyProps,
    tbodyRef,
    disableVirtualization,
    hasPinnedTopRow,
    pinnedTopRowRef,
    noRowsMessage,
    hasPinnedBottomRow,
    pinnedBottomRowRef,
    rowVirtualizationBuffer,
  } = useTableContext();

  const rowVirtualizer = useVirtual({
    size: disableVirtualization ? 0 : rows.length,
    overscan: rowVirtualizationBuffer,
    parentRef: tbodyRef,
    estimateSize: useCallback(() => 35, []),
    keyExtractor: useCallback((index) => rows[index].id, [rows]),
  });

  // console.log("TableBody rendered");

  return (
    <TableBodyWrap>
      <TableBodyInside
        {...getTableBodyProps()}
        ref={tbodyRef}
        className='List'
        disableVirtualization={disableVirtualization}
        rowDensity={rowDensity}
      >
        {hasPinnedTopRow && (
          <PinnedRow
            pinnedRowRef={pinnedTopRowRef}
            componentKey='PinnedTopCell'
            style={{ top: 0 }}
          />
        )}
        {rows.length ? (
          <div
            className='rows'
            style={
              disableVirtualization
                ? undefined
                : { height: `${rowVirtualizer.totalSize}px` }
            }
          >
            {disableVirtualization
              ? rows.map((row, i) => (
                  <Row key={row.id} row={row} id={row.id} index={i} />
                ))
              : rowVirtualizer.virtualItems.map((virtualRow) => (
                  <Row
                    key={virtualRow.key}
                    row={rows[virtualRow.index]}
                    virtualRow={virtualRow}
                    id={virtualRow.key}
                    index={virtualRow.index}
                  />
                ))}
          </div>
        ) : (
          !loading && (
            <Placeholder>
              {noRowsMessage ||
                `No ${title?.toLowerCase?.() || 'results'} to display`}
            </Placeholder>
          )
        )}
        <Spacer />
        {hasPinnedBottomRow && (
          <PinnedRow
            pinnedRowRef={pinnedBottomRowRef}
            componentKey='PinnedBottomCell'
            style={{ bottom: 0 }}
          />
        )}
      </TableBodyInside>
      {!!loading && (
        <LoadingWrap>
          <Spinner size='large' />
        </LoadingWrap>
      )}
    </TableBodyWrap>
  );
};

export default TableBody;

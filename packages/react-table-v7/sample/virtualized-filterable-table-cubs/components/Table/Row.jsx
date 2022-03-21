import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useDependencyDebugger from '../../hooks/useDependencyDebugger';
import DetailRow from './DetailRow';
import { useTableContext } from '.';

const LeftPinnedColumnsShadow = styled.div`
  position: sticky;
  width: 8px;
  min-width: 8px;
  margin-right: -8px;
  background-image: linear-gradient(to right, #00000010, #00000000);
  pointer-events: none;
`;

const RightPinnedColumnsShadow = styled.div`
  position: sticky;
  width: 8px;
  min-width: 8px;
  margin-left: -8px;
  background-image: linear-gradient(to left, #00000010, #00000000);
  pointer-events: none;
`;

const Row = ({ id, row, index, virtualRow }) => {
  const {
    prepareRow,
    detailRow,
    tbodyRef,
    scrollbarWidth,
    cellProps,
    columnDimensions,
    leftPinnedColumnIds,
    rightPinnedColumnIds,
    visibleColumns,
  } = useTableContext();
  const [, setManualRerenderCount] = useState(0);

  // console.log("Row rendered");

  prepareRow(row);

  const rerender = useCallback(
    (duration) => {
      if (duration) {
        let startTime = null;

        const renderFrame = (timestamp) => {
          if (!startTime) {
            startTime = timestamp;
          }

          const currentTime = timestamp - startTime || 0;

          setManualRerenderCount((val) => val + 1);

          if (currentTime < duration) requestAnimationFrame(renderFrame);
        };

        renderFrame();
      } else {
        setManualRerenderCount((val) => val + 1);
      }
    },
    [setManualRerenderCount],
  );

  return (
    <div
      {...row.getRowProps()}
      className='row-group'
      key={id}
      ref={virtualRow ? (ref) => virtualRow.measureRef(ref) : undefined}
      style={
        virtualRow
          ? { transform: `translateY(${virtualRow.start}px)` }
          : undefined
      }
    >
      <div
        className={`tr row ${index % 2 ? ` even` : `odd`}${
          row.isSelected ? ` selected` : ``
        }`}
      >
        {row.cells.map((cell, i) => {
          const cProps = cell.getCellProps(cellProps);
          const { id } = cell.column;

          return (
            <React.Fragment key={`row-${id}-${cell.column.id}`}>
              {leftPinnedColumnIds.length > 0 &&
                leftPinnedColumnIds.length === i && (
                  <LeftPinnedColumnsShadow
                    style={{ left: columnDimensions[i]?.left }}
                  />
                )}
              <div
                {...cProps}
                className='cell td'
                style={{
                  ...cProps.style,
                  ...(i === 0 || i === row.cells.length - 1
                    ? {
                        ...(cProps.style.width
                          ? { width: `calc(${cProps.style.width} + 10px)` }
                          : {}),
                        ...(cProps.style.minWidth
                          ? {
                              minWidth: `calc(${cProps.style.minWidth} + 10px)`,
                            }
                          : {}),
                        ...(cProps.style.maxWidth
                          ? {
                              maxWidth: `calc(${cProps.style.maxWidth} + 10px)`,
                            }
                          : {}),
                      }
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
              >
                {cell.render('Cell', { rerender })}
              </div>
              {rightPinnedColumnIds.length > 0 &&
                visibleColumns.length - rightPinnedColumnIds.length ===
                  i + 1 && (
                  <RightPinnedColumnsShadow
                    style={{ right: columnDimensions[i]?.right }}
                  />
                )}
            </React.Fragment>
          );
        })}
      </div>
      {row.isExpanded && (
        <DetailRow scrollbarWidth={scrollbarWidth} tbodyRef={tbodyRef}>
          {detailRow?.({ row, rerender })}
        </DetailRow>
      )}
    </div>
  );
};

export default Row;

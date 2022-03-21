import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import Icon from '../Icon';
import ColumnHeaderMenu from './ColumnHeaderMenu';
import ItemTypes from './itemTypes';
import { useTableContext } from '.';

const ColumnHeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #157493;
  border-bottom: 1px solid #00000022;
  border-right: 1px solid #00000022;
  box-sizing: border-box;
  &.sortable {
    cursor: pointer;
  }
  &.sorted {
    background: #105970;
  }
`;
const ColumnHeaderInside = styled.div`
  user-select: none;
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: 2px;
  padding: 8px 10px;
  box-sizing: border-box;
  .align-end {
    text-align: end;
  }
  ${ColumnHeaderWrap}:first-child > & {
    padding-left: 20px;
  }
  ${ColumnHeaderWrap}:last-child > & {
    border-right: 0;
    padding-right: 20px;
  }
  &.align-end {
    text-align: end;
    flex-direction: row-reverse;
  }
  text-transform: uppercase;
  font-size: 11px;
  line-height: 14px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: 200ms;
  &.dragging {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 4px 1px rgb(14 30 37 / 6%), 0 8px 16px 0 rgb(14 30 37 / 20%);
    z-index: 1;
  }
  .label {
    flex: 1;
  }
  .sortIndicator {
    transform: rotate(0deg);
    transition: 200ms;
    &.desc {
      transform: rotate(180deg);
    }
  }
  .iconButton {
    opacity: 0;
  }
  &:hover .iconButton {
    opacity: 0.65;
  }
  .iconButton.active,
  &:hover .iconButton:hover {
    opacity: 1;
  }
`;

const ColumnHeaderResizer = styled.div`
  right: -6px;
  width: 10px;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  /* prevents from scrolling while dragging on touch devices */
  touch-action: none;
  transition: 100ms;
  &:hover {
    background: #00000011;
  }
  &.isResizing {
    background: #00000022;
  }
`;

let lastDraggedX;
let dragDirection;

const ColumnHeader = ({ columns, column, index, isGroup, isPlaceholder }) => {
  const {
    reorder,
    headerProps,
    columnHeadersRef,
    columnDimensions,
    resizingColumnId,
    draggedHeader,
    setDraggedHeader,
    draggedIndex,
    setDraggedIndex,
    draggedHoveredHeaderIndex,
    setDraggedHoveredHeaderIndex,
    leftPinnedColumnIds,
    rightPinnedColumnIds,
  } = useTableContext();
  const ref = useRef();
  const { id, Header } = column;
  const [menuAnchorEl, setMenuAnchorEl] = useState();

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      return {
        id,
        index,
        header: Header,
      };
    },
    canDrag: () => !resizingColumnId && !column.disableOrdering,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const handleDropHover = useCallback(
    (item, monitor) => {
      if (!ref.current || resizingColumnId) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      if (lastDraggedX === clientOffset.x) {
        return;
      }

      if (draggedHoveredHeaderIndex !== hoverIndex) {
        // Crossed header lines
        setDraggedHoveredHeaderIndex(hoverIndex);
      }
      if (lastDraggedX !== clientOffset.x) {
        // Moved cursor along the x axis
        if (lastDraggedX) {
          if (clientOffset.x < lastDraggedX) {
            // dragging left
            if (dragDirection !== 'left') {
              // changed directions, occured right after moving right
              dragDirection = 'left';
              if (dragIndex < hoverIndex) {
                // occured after crossing right border, move column left
                reorder(item, dragIndex);
                return;
              }
            }
            if (dragIndex > hoverIndex) {
              // crossed left border
              reorder(item, hoverIndex);
              item.index = hoverIndex;
              return;
            }
          } else {
            // dragging right
            if (dragDirection !== 'right') {
              // changed directions, occured right after moving left
              dragDirection = 'right';
              if (dragIndex > hoverIndex) {
                // occured after crossing left border, move column right
                reorder(item, dragIndex);
                return;
              }
            }
            if (dragIndex < hoverIndex) {
              // crossed right border
              reorder(item, hoverIndex);
              item.index = hoverIndex;
              return;
            }
          }
        }

        lastDraggedX = clientOffset.x;
      }
    },
    [
      draggedHoveredHeaderIndex,
      index,
      reorder,
      resizingColumnId,
      setDraggedHoveredHeaderIndex,
    ],
  );

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    drop: (item) => {
      // Needs to be in setTimeout so this doesn't get overwriten with current values
      setTimeout(() => {
        if (draggedIndex) {
          setDraggedHeader(null);
          setDraggedIndex(null);
          setDraggedHoveredHeaderIndex(null);
          lastDraggedX = undefined;
          dragDirection = undefined;
        }
      });
    },
    hover: handleDropHover,
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    if (isDragging && !draggedIndex) {
      setDraggedIndex(index);
      setDraggedHeader(ref.current);
    }
  }, [ref, isDragging, setDraggedHeader, setDraggedIndex, draggedIndex, index]);

  drag(drop(ref));

  const hProps = column.getHeaderProps(headerProps);
  const headerContent = column.render('Header');
  const columnResizerProps = column.getResizerProps?.();
  const sortByToggleProps = column.getSortByToggleProps?.();

  return (
    <ColumnHeaderWrap
      ref={(el) => {
        columnHeadersRef.current[index] = el;
      }}
      onClick={
        sortByToggleProps.onClick
          ? (e) => {
              if (!resizingColumnId) sortByToggleProps.onClick(e);
            }
          : undefined
      }
      {...hProps}
      title={headerContent === 'string' ? headerContent : undefined}
      style={{
        ...hProps.style,
        ...(index === 0 || index === columns.length - 1
          ? {
              ...(hProps.style.width
                ? { width: `calc(${hProps.style.width} + 10px)` }
                : {}),
              ...(hProps.style.minWidth
                ? { minWidth: `calc(${hProps.style.minWidth} + 10px)` }
                : {}),
              ...(hProps.style.maxWidth
                ? { maxWidth: `calc(${hProps.style.maxWidth} + 10px)` }
                : {}),
            }
          : {}),
        ...(leftPinnedColumnIds.includes(id)
          ? {
              position: 'sticky',
              left: columnDimensions[index]?.left,
              zIndex: 1,
            }
          : {}),
        ...(rightPinnedColumnIds.includes(id)
          ? {
              position: 'sticky',
              right: columnDimensions[index]?.right,
              zIndex: 1,
              borderLeft: '1px solid #00000022',
              marginLeft: -1,
            }
          : {}),
      }}
      className={`th${column.canSort ? ` sortable` : ``}${
        column.isSorted ? ` sorted` : ``
      }`}
    >
      <ColumnHeaderInside
        className={`th-inside${isDragging ? ` dragging` : ``}${
          column.align === 'end' ? ' align-end' : ''
        }`}
        ref={ref}
      >
        <span className='label'>{headerContent}</span>
        {!resizingColumnId && !column.hideMenu && !isGroup && !isPlaceholder && (
          <>
            <Icon
              className={`iconButton${!!menuAnchorEl ? ' active' : ''}`}
              type='more-menu'
              size='xs'
              onClick={(e) => {
                e.stopPropagation();
                setMenuAnchorEl(menuAnchorEl ? null : e.currentTarget);
              }}
            />
            <ColumnHeaderMenu
              menuAnchorEl={menuAnchorEl}
              onClose={() => setMenuAnchorEl(null)}
              column={column}
              index={index}
            />
          </>
        )}
        {column.filterValue && <Icon type='filter' size='xs' />}
        {column.isSorted && (
          <Icon
            type='sort-asc'
            size='xs'
            className={`sortIndicator ${column.isSortedDesc ? `desc` : `asc`}`}
          />
        )}
      </ColumnHeaderInside>
      {column.canResize && !draggedHeader && (
        <ColumnHeaderResizer
          onClick={(e) => e.stopPropagation()}
          {...columnResizerProps}
          onMouseDown={(e) => {
            e.stopPropagation();
            columnResizerProps.onMouseDown(e);
          }}
          className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
        />
      )}
    </ColumnHeaderWrap>
  );
};

export default ColumnHeader;

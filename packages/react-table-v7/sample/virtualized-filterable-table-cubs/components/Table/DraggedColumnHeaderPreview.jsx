import React, { useMemo } from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';

const StyledPreview = styled.div`
  padding: 0.5rem;
  font-weight: bold;
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  z-index: 100;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 8px 10px;
  background: #157493;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  box-sizing: border-box;
`;

const DraggedHeaderPreview = ({ draggedHeader }) => {
  const { currentOffset, isDragging, item } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset() || {},
    initialOffset: monitor.getInitialSourceClientOffset(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
  }));
  const { x, y } = currentOffset;
  const { width, height } = useMemo(
    () => draggedHeader?.getBoundingClientRect?.() || {},
    [draggedHeader],
  );

  return isDragging && false ? (
    <StyledPreview
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width,
        height,
      }}
    >
      {item.header}
    </StyledPreview>
  ) : null;
};

export default DraggedHeaderPreview;

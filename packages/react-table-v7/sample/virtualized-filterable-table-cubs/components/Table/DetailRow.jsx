import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailRowWrap = styled.div`
  border-bottom: 1px solid #e0e2e2;
  position: sticky;
  left: 0;
`;

const DetailRow = ({ tbodyRef, scrollbarWidth = 0, children }) => {
  const [tableBodyWidth, setTableBodyWidth] = useState(
    tbodyRef?.current?.offsetWidth,
  );

  useEffect(() => {
    const handleResize = () => {
      setTableBodyWidth(tbodyRef.current.offsetWidth);
    };

    const tbodyEl = tbodyRef.current;

    if (tbodyEl) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (tbodyEl) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [tbodyRef]);

  return (
    <DetailRowWrap style={{ width: tableBodyWidth - scrollbarWidth }}>
      {children}
    </DetailRowWrap>
  );
};

export default DetailRow;

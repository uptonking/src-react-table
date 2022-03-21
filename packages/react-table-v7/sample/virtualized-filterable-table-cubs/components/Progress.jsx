import React from 'react';
import styled from 'styled-components';

const ProgressWrap = styled.div`
  width: 100%;
`;
const ProgressTrack = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 4px;
  border-radius: 4px;
  width: 100%;
`;
const ProgressIndicator = styled.div`
  background: ${({ theme, color }) => theme.color[color]};
  height: 4px;
  border-radius: 4px;
`;
const ProgressDescription = styled.div`
  font-size: 10px;
`;

const Progress = ({ value, className, description, color = 'primary' }) => {
  return (
    <ProgressWrap className={className}>
      <ProgressTrack>
        <ProgressIndicator
          color={color}
          style={{ width: Number(value) * 100 + '%' }}
        />
      </ProgressTrack>
      {description && <ProgressDescription>{description}</ProgressDescription>}
    </ProgressWrap>
  );
};

export default Progress;

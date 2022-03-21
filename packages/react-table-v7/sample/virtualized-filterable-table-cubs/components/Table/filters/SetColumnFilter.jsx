import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import Button from '../../Button';
import { LabeledCheckbox } from '../../Checkbox';

const SetFilterCheckboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: -8px;
  padding: 8px;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const filterSet = (rows, id, filterValue = []) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];

    return filterValue ? filterValue.includes(rowValue) : true;
  });
};

export const SetColumnFilter = ({
  column: {
    filterValue,
    preFilteredRows,
    setFilter,
    id,
    filterOptions: { hideClearButton } = {},
  },
}) => {
  const uniqueValues = useMemo(
    () =>
      preFilteredRows
        .map((row) => row.values[id])
        .filter((row, i, arr) => arr.indexOf(row) === i),
    [preFilteredRows, id],
  );

  useEffect(() => {
    if (filterValue?.length === uniqueValues.length) {
      setFilter(undefined);
    }
  }, [filterValue, setFilter, uniqueValues]);

  const clearFilter = () => setFilter(uniqueValues);

  return (
    <>
      <SetFilterCheckboxes>
        {uniqueValues.map((val, i) => (
          <LabeledCheckbox
            key={`set-filter-${i}`}
            checked={!!filterValue?.includes(val) || !filterValue}
            onChange={() => {
              if (!filterValue) {
                setFilter(() => uniqueValues.filter((uVal) => uVal !== val));
              } else {
                setFilter((old = []) =>
                  old.includes(val)
                    ? old.filter((oldVal) => oldVal !== val)
                    : [...old, val],
                );
              }
            }}
          >
            {val}
          </LabeledCheckbox>
        ))}
      </SetFilterCheckboxes>
      {!hideClearButton && (
        <>
          <hr />
          <Button
            size='small'
            variant='outlined'
            color='primary'
            onClick={clearFilter}
          >
            Clear
          </Button>
        </>
      )}
    </>
  );
};

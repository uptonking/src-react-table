import React, { useState } from 'react';

import Button from '../../Button';
import Input from '../../Input';
import Select from '../../Select';
import ToggleGroup from '../../ToggleGroup';

const equal = (searchValue, sourceValue) =>
  Number(sourceValue) === Number(searchValue);
const notEqual = (searchValue, sourceValue) =>
  Number(sourceValue) !== Number(searchValue);
const lessThan = (searchValue, sourceValue) =>
  Number(sourceValue) < Number(searchValue);
const lessThanOrEqual = (searchValue, sourceValue) =>
  Number(sourceValue) <= Number(searchValue);
const greaterThan = (searchValue, sourceValue) =>
  Number(sourceValue) > Number(searchValue);
const greaterThanOrEqual = (searchValue, sourceValue) =>
  Number(sourceValue) >= Number(searchValue);

export const filterNumber = (rows, id, filterValue) => {
  const [
    relationalOperatorOne,
    valueOne,
    logicalOperator,
    relationalOperatorTwo,
    valueTwo,
  ] = filterValue || [];

  return rows.filter((row) => {
    const rowValue = row.values[id];
    let matchOne = true;

    if (valueOne) {
      if (relationalOperatorOne === 'equal') {
        matchOne = equal(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'notEqual') {
        matchOne = notEqual(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'lessThan') {
        matchOne = lessThan(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'lessThanOrEqual') {
        matchOne = lessThanOrEqual(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'greaterThan') {
        matchOne = greaterThan(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'greaterThanOrEqual') {
        matchOne = greaterThanOrEqual(valueOne, rowValue);
      }
    }

    let matchTwo = true;

    if (valueTwo) {
      if (relationalOperatorTwo === 'equal') {
        matchTwo = equal(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'notEqual') {
        matchTwo = notEqual(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'lessThan') {
        matchTwo = lessThan(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'lessThanOrEqual') {
        matchTwo = lessThanOrEqual(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'greaterThan') {
        matchTwo = greaterThan(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'greaterThanOrEqual') {
        matchTwo = greaterThanOrEqual(valueTwo, rowValue);
      }
    }

    return logicalOperator === 'and'
      ? matchOne && (!valueTwo || matchTwo)
      : matchOne || (valueTwo && matchTwo);
  });
};

const relationalOperators = [
  { value: 'equal', label: 'Equal' },
  { value: 'notEqual', label: 'Not Equal' },
  { value: 'lessThan', label: 'Less Than' },
  { value: 'lessThanOrEqual', label: 'Less Than Or Equal' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'greaterThanOrEqual', label: 'Greater Than Or Equal' },
];

export const NumberColumnFilter = ({
  column: {
    filterValue = [],
    preFilteredRows,
    setFilter,
    id,
    filterOptions: { hideClearButton } = {},
  },
}) => {
  const [fallbackRelationalOperatorOne, setFallbackRelationalOperatorOne] =
    useState('equal');
  const [
    relationalOperatorOne,
    valueOne = '',
    logicalOperator,
    relationalOperatorTwo,
    valueTwo = '',
  ] = filterValue || [];
  const setRelationalOperatorOne = (val) => {
    setFilter((old = []) => [val, old[1], old[2], old[3], old[4]]);
  };
  const setValueOne = (val) => {
    setFilter((old = []) => [
      old[0] || fallbackRelationalOperatorOne,
      val,
      old[2] || 'and',
      old[3] || 'equal',
      old[4],
    ]);
  };
  const setLogicalOperator = (val) => {
    setFilter((old = []) => [old[0], old[1], val, old[3], old[4]]);
  };
  const setRelationalOperatorTwo = (val) => {
    setFilter((old = []) => [old[0], old[1], old[2], val, old[4]]);
  };
  const setValueTwo = (val) => {
    setFilter((old = []) => [old[0], old[1], old[2], old[3], val]);
  };
  const clearFilter = () => setFilter(undefined);

  return (
    <>
      <Select
        value={relationalOperatorOne || fallbackRelationalOperatorOne}
        options={relationalOperators}
        onChange={(val) => {
          setFallbackRelationalOperatorOne(val);
          if (valueOne) {
            setRelationalOperatorOne(val);
          }
        }}
      />
      <Input
        placeholder='Filter...'
        autoFocus
        value={valueOne}
        onChange={(e) => {
          if (e.target.value === '') {
            clearFilter();
          } else {
            setValueOne(e.target.value);
          }
        }}
      />
      {valueOne && (
        <>
          <ToggleGroup
            value={logicalOperator}
            options={[
              { value: 'and', label: 'And' },
              { value: 'or', label: 'Or' },
            ]}
            onChange={(val) => setLogicalOperator(val)}
          />
          <Select
            value={relationalOperatorTwo}
            options={relationalOperators}
            onChange={(val) => setRelationalOperatorTwo(val)}
          />
          <Input
            placeholder='Filter...'
            value={valueTwo}
            onChange={(e) => setValueTwo(e.target.value)}
          />
        </>
      )}
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

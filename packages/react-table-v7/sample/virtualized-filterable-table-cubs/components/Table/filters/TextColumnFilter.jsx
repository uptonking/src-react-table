import React, { useState } from 'react';

import Button from '../../Button';
import Input from '../../Input';
import Select from '../../Select';
import ToggleGroup from '../../ToggleGroup';

const contains = (searchValue, sourceValue) =>
  sourceValue.toString().toLowerCase().includes(searchValue.toLowerCase());
const notContains = (searchValue, sourceValue) =>
  !sourceValue.toString().toLowerCase().includes(searchValue.toLowerCase());
const equal = (searchValue, sourceValue) =>
  sourceValue.toString().toLowerCase() === searchValue.toLowerCase();
const notEqual = (searchValue, sourceValue) =>
  sourceValue.toString().toLowerCase() !== searchValue.toLowerCase();
const startsWith = (searchValue, sourceValue) =>
  sourceValue.toString().toLowerCase().startsWith(searchValue.toLowerCase());
const endsWith = (searchValue, sourceValue) =>
  sourceValue.toString().toLowerCase().endsWith(searchValue.toLowerCase());

export const filterText = (rows, id, filterValue) => {
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
      if (relationalOperatorOne === 'contains') {
        matchOne = contains(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'notContains') {
        matchOne = notContains(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'equal') {
        matchOne = equal(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'notEqual') {
        matchOne = notEqual(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'startsWith') {
        matchOne = startsWith(valueOne, rowValue);
      }

      if (relationalOperatorOne === 'endsWith') {
        matchOne = endsWith(valueOne, rowValue);
      }
    }

    let matchTwo = true;

    if (valueTwo) {
      if (relationalOperatorTwo === 'contains') {
        matchTwo = contains(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'notContains') {
        matchTwo = notContains(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'equal') {
        matchTwo = equal(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'notEqual') {
        matchTwo = notEqual(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'startsWith') {
        matchTwo = startsWith(valueTwo, rowValue);
      }

      if (relationalOperatorTwo === 'endsWith') {
        matchTwo = endsWith(valueTwo, rowValue);
      }
    }

    return logicalOperator === 'and'
      ? matchOne && (!valueTwo || matchTwo)
      : matchOne || (valueTwo && matchTwo);
  });
};

const relationalOperators = [
  { value: 'contains', label: 'Contains' },
  { value: 'notContains', label: 'Does Not Contain' },
  { value: 'equal', label: 'Equal' },
  { value: 'notEqual', label: 'Does Not Equal' },
  { value: 'startsWith', label: 'Starts With' },
  { value: 'endsWith', label: 'Ends With' },
];

export const TextColumnFilter = ({
  column: {
    filterValue = [],
    setFilter,
    filterOptions: { hideClearButton } = {},
  },
}) => {
  const [fallbackRelationalOperatorOne, setFallbackRelationalOperatorOne] =
    useState('contains');
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
      old[3] || 'contains',
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

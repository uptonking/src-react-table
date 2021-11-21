import { AggregationFn } from './types';

export const sum: AggregationFn = (_, aggregatedValues) => {
  // It's faster to just add the aggregations together instead of
  // process leaf nodes individually
  return aggregatedValues.reduce(
    (sum, next) => sum + (typeof next === 'number' ? next : 0),
    0,
  );
};

export const min: AggregationFn = (values) => {
  let min = 0;

  values.forEach((value) => {
    if (typeof value === 'number') {
      min = Math.min(min, value);
    }
  });

  return min;
};

export const max: AggregationFn = (values) => {
  let max = 0;

  values.forEach((value) => {
    if (typeof value === 'number') {
      max = Math.max(max, value);
    }
  });

  return max;
};

export const minMax: AggregationFn = (values) => {
  let min = 0;
  let max = 0;

  values.forEach((value) => {
    if (typeof value === 'number') {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  });

  return `${min}..${max}`;
};

export const average: AggregationFn = (values) => {
  return sum([], values) / values.length;
};

export const median: AggregationFn = (values) => {
  if (!values.length) {
    return null;
  }

  let min = 0;
  let max = 0;

  values.forEach((value) => {
    if (typeof value === 'number') {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  });

  return (min + max) / 2;
};

export const unique: AggregationFn = (values) => {
  return Array.from(new Set(values).values());
};

export const uniqueCount: AggregationFn = (values) => {
  return new Set(values).size;
};

export const count: AggregationFn = (values) => {
  return values.length;
};

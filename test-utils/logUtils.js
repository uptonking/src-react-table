/**
 * find and filter (thus causing data loss) a cyclic reference
 * by using the `replacer` parameter of `JSON.stringify()`.
 * eg: JSON.stringify(circularReference, getCircularReplacer());
 */
export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

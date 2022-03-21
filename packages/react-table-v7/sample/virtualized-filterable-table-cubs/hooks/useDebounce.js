import { useEffect, useRef, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const firstDebounce = useRef(true);
  useEffect(() => {
    if (value && firstDebounce.current) {
      setDebouncedValue(value);
      firstDebounce.current = false;
      return;
    }
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;

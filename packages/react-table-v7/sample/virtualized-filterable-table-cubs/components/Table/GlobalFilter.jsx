import React, { useEffect, useState } from 'react';
import Input from '../Input';

const GlobalFilter = ({ globalFilter, onChange, disabled, title }) => {
  const [value, setValue] = useState(globalFilter);

  useEffect(() => setValue(globalFilter), [setValue, globalFilter]);

  return (
    <Input
      className='global-filter'
      type='search'
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Filter ${title?.toLowerCase?.() || 'results'}...`}
      disabled={disabled}
    />
  );
};

export default GlobalFilter;

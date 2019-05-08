import React from 'react';

const Select = ({ options, ...props }) => {
  if (options.length === 0) return null;
  return (
    <select {...props}>
      <option value="">Seçiniz</option>
      {options.map((opt) => {
        let label = opt;
        let value = opt;
        if (typeof opt === 'object') {
          label = opt.label;
          value = opt.value;
        }
        return (
          <option value={value} key={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

Select.defaultProps = {
  options: [],
};

export default Select;

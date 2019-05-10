import React from 'react';

const Select = ({
  options, children, addEmptyOption, emptyOptionLabel, ...props
}) => (
  <select {...props}>
    {addEmptyOption && <option value="">{emptyOptionLabel}</option>}
    {options
      ? options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))
      : children}
  </select>
);

Select.defaultProps = { addEmptyOption: true, emptyOptionLabel: 'Select' };

export default Select;

import React from 'react';

export const uniqueArray = arr => [...new Set(arr)];

export const getFormNames = form => uniqueArray(
  Array.from(form.elements)
    .map(({ name }) => name)
    .filter(name => name),
);

export const convertOptions = options => options.map((opt) => {
  if (typeof opt === 'object') {
    return opt;
  }
  return { label: opt, value: opt };
});

export const Context = React.createContext();

export default {};

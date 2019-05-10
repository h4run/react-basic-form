import React from 'react';

import { Context } from './utils';

const FormSubmit = ({ children }) => (
  <Context.Consumer>
    {(context) => {
      if (children) return typeof children === 'function' ? children(context) : children;

      const { isLoading } = context;
      return (
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending' : 'Send'}
        </button>
      );
    }}
  </Context.Consumer>
);

export default FormSubmit;

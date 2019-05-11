import React from 'react';
import PropTypes from 'prop-types';

import { Context } from './utils';

const FormSubmit = ({ children, label, loadingLabel }) => (
  <Context.Consumer>
    {(context) => {
      if (children) return typeof children === 'function' ? children(context) : children;

      const { isLoading } = context;
      return (
        <button type="submit" disabled={isLoading}>
          {(isLoading && loadingLabel) || label}
        </button>
      );
    }}
  </Context.Consumer>
);

FormSubmit.defaultProps = {
  label: 'Send',
  loadingLabel: 'Sending',
};
FormSubmit.propTypes = {
  label: PropTypes.string,
  loadingLabel: PropTypes.string,
};

export default FormSubmit;

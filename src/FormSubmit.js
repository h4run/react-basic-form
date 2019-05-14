import React from 'react';
import PropTypes from 'prop-types';

import { Context } from './utils';

const FormSubmit = ({
  children, text, loadingText, ...props
}) => (
  <Context.Consumer>
    {(context) => {
      if (children) return typeof children === 'function' ? children(context) : children;

      const { isLoading } = context;
      return (
        <button type="submit" disabled={isLoading} {...props}>
          {(isLoading && loadingText) || text}
        </button>
      );
    }}
  </Context.Consumer>
);

FormSubmit.defaultProps = {
  text: 'Send',
  loadingText: 'Sending',
};
FormSubmit.propTypes = {
  text: PropTypes.string,
  loadingText: PropTypes.string,
};

export default FormSubmit;

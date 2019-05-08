import React from 'react';

const Input = props => <input {...props} />;

Input.defaultProps = {
  type: 'text',
};

export default Input;

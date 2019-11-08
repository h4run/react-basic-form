import React from 'react';

const Input = React.forwardRef((props, ref) => <input {...props} ref={ref} />);

Input.defaultProps = {
  type: 'text',
};

export default Input;

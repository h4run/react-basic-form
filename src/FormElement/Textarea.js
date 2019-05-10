import React from 'react';

const Textarea = props => <textarea {...props} />;

Textarea.defaultProps = {
  rows: 5,
};

export default Textarea;

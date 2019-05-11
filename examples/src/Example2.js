import React from 'react';

import Form from '../../src';

const Example2 = () => (
  <Form onSubmit={data => console.log(data)}>
    <Form.Element>
      {({ showErrorMessage, onChange }) => (
        <div className="form-element">
          <label>Full Name</label>
          <input name="fullname" type="text" onChange={onChange} required />
          {showErrorMessage('fullname')}
        </div>
      )}
    </Form.Element>
    <Form.Submit>
      {({ isLoading }) => (
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending' : 'Send'}
        </button>
      )}
    </Form.Submit>
  </Form>
);

export default Example2;

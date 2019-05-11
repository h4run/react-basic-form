import React from 'react';

import Form from '../../src';

const Example3 = () => (
  <Form onSubmit={data => console.log(data)}>
    {({ showErrorMessage, onChange, isLoading }) => (
      <>
        <div className="form-element">
          <label>Full Name</label>
          <input name="fullname" type="text" onChange={onChange} required />
          {showErrorMessage('fullname')}
        </div>
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </>
    )}
  </Form>
);

export default Example3;

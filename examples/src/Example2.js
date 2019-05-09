import React from 'react';

import Form from '../../src';

const Example2 = () => (
  <Form onSubmit={data => console.log(data)}>
    <Form.Element>
      {({ showErrorMessage, onChange }) => (
        <div className="form-element">
          <label>Ad Soyad</label>
          <input name="fullname" type="text" onChange={onChange} required />
          {showErrorMessage('fullname')}
        </div>
      )}
    </Form.Element>
    <button type="submit">Submit</button>
  </Form>
);

export default Example2;

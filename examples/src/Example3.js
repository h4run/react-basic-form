import React from 'react';

import Form from '../../src';

const Example2 = () => (
  <Form onSubmit={data => console.log(data)}>
    {({ showErrorMessage, onChange }) => (
      <>
        <div className="form-element">
          <label>Ad</label>
          <input name="name" type="text" onChange={onChange} required />
          {showErrorMessage('name')}
        </div>
        <div className="form-element">
          <label>Soyad</label>
          <input name="surname" type="text" onChange={onChange} required />
          {showErrorMessage('surname')}
        </div>
        <button type="submit">Submit</button>
      </>
    )}
  </Form>
);

export default Example2;

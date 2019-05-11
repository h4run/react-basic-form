import React from 'react';
import { emailRegex } from './utils';

import Form from '../../src';

const Example1 = () => (
  <Form
    onSubmit={(data, submitState) => {
      submitState.start(); // isLoading true
      setTimeout(() => {
        console.log(data);
        submitState.end(); // form reset && isLoading = false
      }, 1000);
    }}
    validations={{
      email: value => emailRegex.test(value),
    }}
    errorMessages={{
      email: 'Please check your email address.',
    }}
  >
    <Form.Element label="Full Name" name="fullname" required />
    <Form.Element label="E-mail" name="email" type="email" required />
    <Form.Element
      label="Gender"
      name="gender"
      type="radio"
      options={[{ label: 'Male', value: 'm' }, { label: 'Female', value: 'f' }]}
      // options={['Male', 'Female']}
      required
    />
    <Form.Element
      label="Favorite Colors"
      name="favorite_colors"
      type="checkbox"
      options={['Blue', 'Red', 'Green', 'Yellow']}
      // defaultValue={['Blue', 'Green']}
      // defaultValue="Blue"
      required
    />
    <Form.Element
      label="Select a number from 1 to 10"
      name="your_number"
      type="select"
      options={[...Array.from(Array(10)).map((c, i) => i + 1)]}
      required
    />
    <Form.Element label="Message" name="message" type="textarea" required />
    <Form.Submit />
  </Form>
);

export default Example1;

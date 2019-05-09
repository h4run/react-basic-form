import React from 'react';
import { isTCNumber, emailRegex, mobilePhoneTurkeyRegex } from './utils';

import Form from '../../src';

const Example1 = () => (
  <Form
    onSubmit={data => console.log(data)}
    validations={{
      phone: value => mobilePhoneTurkeyRegex.test(value),
      email: value => emailRegex.test(value),
      idnumber: value => isTCNumber(value),
    }}
    errorMessages={{
      phone: 'Lütfen cep telefonu numarasını kontrol ediniz.',
      email: 'Lütfen e-posta adresinizi kontrol ediniz.',
      idnumber: 'Lütfen kimlik numaranızı kontrol ediniz.',
    }}
  >
    <Form.Element label="Ad Soyad" name="fullname" required />
    <Form.Element label="E-posta" name="email" type="email" required />
    <Form.Element
      label="Cinsiyet"
      name="cinsiyet"
      type="radio"
      options={[{ label: 'Erkek', value: 'm' }, { label: 'Kadın', value: 'f' }]}
      required
    />
    <Form.Element
      label="Sevdiğin Renkler"
      name="yourcolors"
      type="checkbox"
      options={['Blue', 'Red', 'Green', 'Yellow']}
      // defaultValue={['Blue', 'Green']}
      required
    />
    <Form.Element
      label="Hobilerin"
      name="yourcolors"
      type="checkbox"
      options={['Sinema', 'Futbol']}
      // defaultValue="Sinema"
      required
    />
    <Form.Element label="T.C. Kimlik No" name="idnumber" required />
    <Form.Element label="İl" name="city" type="select" options={['İSTANBUL', 'ANKARA']} required />
    <Form.Element label="Telefon" name="phone" required />
    <button type="submit">Submit</button>
  </Form>
);

export default Example1;

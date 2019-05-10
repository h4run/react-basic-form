import React from 'react';
import { isTCNumber, emailRegex, mobilePhoneTurkeyRegex } from './utils';

import Form from '../../src';

const Example1 = () => (
  <Form
    onSubmit={(data, submitState) => {
      submitState.start();
      setTimeout(() => {
        console.log(data);
        submitState.end();
      }, 1000);
    }}
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
    <Form.Element label="Ad Soyad" name="fullname" required={false} />
    <Form.Element label="E-posta" name="email" type="email" required={false} />
    <Form.Element
      label="Cinsiyet"
      name="cinsiyet"
      type="radio"
      options={[{ label: 'Erkek', value: 'm' }, { label: 'Kadın', value: 'f' }]}
      // defaultValue="m"
      required={false}
    />
    <Form.Element
      label="Sevdiğin Renkler"
      name="yourcolors"
      type="checkbox"
      options={['Blue', 'Red', 'Green', 'Yellow']}
      // defaultValue={['Blue', 'Green']}
      required={false}
    />
    <Form.Element label="T.C. Kimlik No" name="idnumber" required={false} />
    <Form.Element
      label="İl"
      name="city"
      type="select"
      options={['İSTANBUL', 'ANKARA']}
      required={false}
    />
    <Form.Element label="Telefon" name="phone" required={false} />
    <Form.Element label="Mesaj" name="message" type="textarea" required={false} />
    <Form.Submit />
  </Form>
);

export default Example1;

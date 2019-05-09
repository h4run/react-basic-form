import React from 'react';
import { isTCNumber, emailRegex, mobilePhoneTurkeyRegex } from './utils';

import Form from '../../src';

import '../../src/css/example.scss';

const Sample = () => (
  <Form
    onSubmit={data => console.log(data)}
    validations={{
      cellphone: value => mobilePhoneTurkeyRegex.test(value),
      email: value => emailRegex.test(value),
      idnumber: value => isTCNumber(value),
    }}
    errorMessages={{
      cellphone: 'Lütfen cep telefonu numarasını kontrol ediniz.',
      email: 'Lütfen e-posta adresinizi kontrol ediniz.',
      idnumber: 'Lütfen kimlik numaranızı kontrol ediniz.',
    }}
  >
    <Form.Element>
      {({ showErrorMessage, onChange }) => (
        <div className="form-element">
          <label>Ad</label>
          <input name="name" type="text" onChange={onChange} required />
          {showErrorMessage('name')}
        </div>
      )}
    </Form.Element>

    <Form.Element label="Soyad" name="surname" required />
    <Form.Element label="E-posta" name="email" type="email" required />
    <Form.Element label="Cinsiyet" name="cinsiyet" type="radio" required />
    <Form.Element label="T.C. Kimlik No" name="idnumber" required />
    <Form.Element label="Adres" name="address" type="textarea" rows="10" required />
    <Form.Element label="Posta Kodu" name="postcode" required />
    <Form.Element label="İl" name="city" type="select" options={['İSTANBUL', 'ANKARA']} required />
    <Form.Element label="Telefon (Sabit)" name="phone" required />
    <Form.Element label="Telefon (Cep)" name="cellphone" required />
    <Form.Element label="Şikayetçi Olduğunuz Firma" name="complaint" required />
    <Form.Element
      label="Şikayet Türü"
      name="complainttype"
      type="select"
      options={[
        'Kayıp/Çalıntı İhbarı',
        'Yurt Dışından Getirilen Cihazlar',
        'Elektronik Kimlik Bilgisi Değiştirilmiş  (Klon) Cihazlar',
        'Diğer',
      ]}
      required
    />
    <Form.Element label="Şikayetiniz" name="message" type="text-area" rows="10" required />
    <button type="submit">Submit</button>
  </Form>
);

export default Sample;

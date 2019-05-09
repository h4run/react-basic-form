import React from 'react';
import { isTCNumber, emailRegex, mobilePhoneTurkeyRegex } from './utils';

import Form from '../../src';

import '../../src/css/example.scss';

const renderForm = ({ showErrorMessage, onChange }) => {
  const defaultProps = {
    showErrorMessage,
    onChange,
    required: true,
  };

  return (
    <>
      <Form.Element label="Ad" name="name" {...defaultProps} />

      <Form.Element label="Soyad" name="surname" {...defaultProps} />

      <Form.Element label="E-posta" name="email" type="email" {...defaultProps} />

      <Form.Element label="T.C. Kimlik No" name="idnumber" {...defaultProps} />

      <Form.Element label="Adres" name="address" type="textarea" rows="10" {...defaultProps} />

      <Form.Element label="Posta Kodu" name="postcode" {...defaultProps} />
      <Form.Element
        label="İl"
        name="city"
        type="select"
        options={['İSTANBUL', 'ANKARA']}
        {...defaultProps}
      />

      <Form.Element label="Telefon (Sabit)" name="phone" {...defaultProps} />

      <Form.Element label="Telefon (Cep)" name="cellphone" {...defaultProps} />

      <Form.Element label="Şikayetçi Olduğunuz Firma" name="complaint" {...defaultProps} />
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
        {...defaultProps}
      />

      <Form.Element
        label="Şikayetiniz"
        name="message"
        type="text-area"
        rows="10"
        {...defaultProps}
      />
    </>
  );
};

const Sample = () => (
  <Form
    onSubmit={data => console.log(data)}
    render={renderForm}
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
  />
);

export default Sample;

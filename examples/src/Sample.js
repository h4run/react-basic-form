import React from 'react';
import { Flex, Box } from '@rebass/grid';
import { isEmail, isMobilePhone } from 'validator';
import { isTCNumber } from './utils';

import Form from '../../src';

import { Row, Column } from './Layout';

const renderForm = ({ showErrorMessage, onChange }) => {
  const defaultProps = {
    showErrorMessage,
    onChange,
    required: true,
  };

  return (
    <Row>
      <Column>
        <Form.Element label="Ad" name="name" {...defaultProps} />
      </Column>
      <Column>
        <Form.Element label="Soyad" name="surname" {...defaultProps} />
      </Column>
      <Column>
        <Form.Element label="E-posta" name="email" type="email" {...defaultProps} />
      </Column>
      <Column>
        <Form.Element label="T.C. Kimlik No" name="idnumber" {...defaultProps} />
      </Column>
      <Column>
        <Form.Element label="Adres" name="address" type="textarea" rows="10" {...defaultProps} />
      </Column>
      <Flex
        px={[0, 0, 4]}
        mb={[3, 3, 4]}
        width={[1, 1, 1 / 2]}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box mb={4}>
          <Form.Element label="Posta Kodu" name="postcode" {...defaultProps} />
        </Box>
        <Box mb="10px">
          <Form.Element
            label="İl"
            name="city"
            type="select"
            options={['İSTANBUL', 'ANKARA']}
            {...defaultProps}
          />
        </Box>
      </Flex>
      <Column>
        <Form.Element label="Telefon (Sabit)" name="phone" {...defaultProps} />
      </Column>
      <Column>
        <Form.Element label="Telefon (Cep)" name="cellphone" {...defaultProps} />
      </Column>
      <Flex
        px={[0, 0, 4]}
        mb={[3, 3, 4]}
        width={[1, 1, 1 / 2]}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box mb={4}>
          <Form.Element label="Şikayetçi Olduğunuz Firma" name="complaint" {...defaultProps} />
        </Box>
        <Box mb="10px">
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
        </Box>
      </Flex>
      <Column>
        <Form.Element
          label="Şikayetiniz"
          name="message"
          type="text-area"
          rows="10"
          {...defaultProps}
        />
      </Column>
    </Row>
  );
};

const Sample = () => (
  <Form
    render={renderForm}
    validations={{
      cellphone: value => isMobilePhone(value, 'tr-TR'),
      email: value => isEmail(value, { allow_utf8_local_part: false }),
      idnumber: value => isTCNumber(value),
    }}
    errorMessages={{
      phone: 'Lütfen cep telefonu numarasını kontrol ediniz.',
      email: 'Lütfen e-posta adresinizi kontrol ediniz.',
      idnumber: 'Lütfen kimlik numaranızı kontrol ediniz.',
    }}
  />
);

export default Sample;

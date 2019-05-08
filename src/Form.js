import React from 'react';

import { isEmail, isMobilePhone } from 'validator';
import { getFormElements, isTCNumber } from './utils';

class Form extends React.Component {
  state = {
    errors: [],
  };

  _handleChange = (e) => {
    const { name, value, required } = e.target;
    if (this.hasError(name)) {
      this.isValid({ name, value, required });
    }
  };

  _handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formElements = getFormElements(form);

    if (this.isValidAll(formElements)) {
      const data = formElements.map(({ name, value }) => ({ name, value }));

      console.log(data);

      form.reset();
    }
  };

  _showErrorMessage = (name) => {
    const { errorMessages, defaultErrorMessage } = this.props;
    const errorMessage = errorMessages[name] || defaultErrorMessage;
    if (this.hasError(name)) return <div className="error-message">{errorMessage}</div>;
  };

  isValidAll(formElements) {
    return formElements.reduce((isValid, element) => {
      const formElement = element.length > 0 && !element.nodeName ? element[0] : element;

      return (
        this.isValid({
          name: element.name,
          value: element.value,
          required: formElement.required,
        }) && isValid
      );
    }, true);
  }

  hasError(name) {
    const { errors } = this.state;
    return errors.includes(name);
  }

  addError(name) {
    if (!this.hasError(name)) {
      this.setState(prevState => ({ errors: [...prevState.errors, name] }));
    }
  }

  removeError(name) {
    if (this.hasError(name)) {
      this.setState(prevState => ({ errors: prevState.errors.filter(e => e !== name) }));
    }
  }

  isValid({ name, value, required }) {
    let defaultFieldIsValid = true;

    if (required) {
      defaultFieldIsValid = !!value;
    }

    let customFieldIsValid = true;
    let message;

    if (required || value) {
      switch (name) {
        case 'cellphone':
          customFieldIsValid = isMobilePhone(value, 'tr-TR');
          break;
        case 'email':
          customFieldIsValid = isEmail(value, { allow_utf8_local_part: false });
          break;
        case 'idnumber':
          customFieldIsValid = isTCNumber(value);
          break;
        case 'password':
          if (!value || value.length < 8) {
            message = 'Şifreniz en az 8 karakter olmalıdır.';
            customFieldIsValid = false;
            break;
          } else if (!value.match(/((?=.*[a-zA-Z]))(?=(.*\d){1,})^.*$/)) {
            message = 'Şifrenizde en az bir rakam ve bir harf bulunmalıdır.';
            customFieldIsValid = false;
            break;
          }
          break;
        default:
          customFieldIsValid = true;
      }
    }

    const isValid = defaultFieldIsValid && customFieldIsValid;

    if (isValid) this.removeError(name);
    else this.addError(name);

    return isValid;
  }

  render() {
    const { render, children, submitLabel } = this.props;
    return (
      <form onSubmit={this._handleSubmit} noValidate>
        {render
          && render({
            showErrorMessage: this._showErrorMessage,
            onChange: this._handleChange,
          })}
        {children}
        <button type="submit">{submitLabel}</button>
      </form>
    );
  }
}

Form.defaultProps = {
  submitLabel: 'Gönder',
  errorMessages: {},
  defaultErrorMessage: 'Bu alan doldurulması zorunludur.',
};

export default Form;

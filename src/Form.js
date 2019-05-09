import React from 'react';

import { getFormElements, Context } from './utils';

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

    const { onSubmit } = this.props;
    const form = e.target;
    const formElements = getFormElements(form);

    if (this.isValidAll(formElements)) {
      const data = formElements.map(({ name, value }) => ({ name, value }));

      if (onSubmit) {
        onSubmit(data);
      }

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
    const { validations } = this.props;
    let defaultFieldIsValid = true;

    if (required) {
      defaultFieldIsValid = !!value;
    }

    let customFieldIsValid = true;

    if ((required || value) && validations[name]) {
      customFieldIsValid = validations[name](value);
    }

    const isValid = defaultFieldIsValid && customFieldIsValid;

    if (isValid) this.removeError(name);
    else this.addError(name);

    return isValid;
  }

  render() {
    const { children } = this.props;

    const contextProps = {
      showErrorMessage: this._showErrorMessage,
      onChange: this._handleChange,
    };
    return (
      <Context.Provider value={contextProps}>
        <form onSubmit={this._handleSubmit} noValidate>
          {typeof children === 'function' ? children(contextProps) : children}
        </form>
      </Context.Provider>
    );
  }
}

Form.defaultProps = {
  errorMessages: {},
  validations: {},
  defaultErrorMessage: 'This field is required.',
};

export default Form;

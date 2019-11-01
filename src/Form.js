import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { getFormNames, Context } from './utils';

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
    const { isLoading, errors } = this.state;
    if (isLoading) return;

    const { onSubmit, errorOnSubmit } = this.props;
    const form = e.target;
    const names = getFormNames(form);

    const submitActions = {
      start: () => {
        this.setState({ isLoading: true });
      },
      end: () => {
        form.reset();
        this.setState({ isLoading: false });
      },
    };

    if (this.isValidAll(form, names)) {
      const data = names.reduce((acc, name) => ({ ...acc, [name]: form.elements[name].value }), {});

      if (onSubmit) {
        onSubmit(data, submitActions);
      }
    } else if (errorOnSubmit) {
      errorOnSubmit(errors);
    }
  };

  _showErrorMessage = (name) => {
    const { errorMessages, defaultErrorMessage } = this.props;

    const errorMessage = errorMessages[name] || defaultErrorMessage;
    if (this.hasError(name)) return <div className="error-message">{errorMessage}</div>;
  };

  submit = () => {
    this.form.dispatchEvent(new Event('submit'));
  }

  isValidAll(form, names) {
    return names.reduce((isValid, name) => {
      const element = form.elements[name];
      const formElement = element.length > 0 && !element.nodeName ? element[0] : element;

      return (
        this.isValid({
          name,
          value: element.type === 'checkbox' ? element.checked : element.value,
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
    const {
      children,
      errorMessages,
      validations,
      onSubmit,
      defaultErrorMessage,
      className,
      ...props
    } = this.props;

    const { isLoading } = this.state;

    const contextProps = {
      showErrorMessage: this._showErrorMessage,
      onChange: this._handleChange,
      isLoading,
    };
    return (
      <Context.Provider value={contextProps}>
        <form
          onSubmit={this._handleSubmit}
          noValidate
          className={cx('react-basic-form', className)}
          {...props}
          ref={(n) => {
            this.form = n;
          }}
        >
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
Form.propTypes = {
  errorMessages: PropTypes.object,
  validations: PropTypes.object,
  defaultErrorMessage: PropTypes.string,
};

export default Form;

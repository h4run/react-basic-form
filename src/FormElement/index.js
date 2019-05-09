import React from 'react';

import { Context } from '../utils';

import RadioList from './RadioList';
import CheckboxList from './CheckboxList';
import Select from './Select';
import Textarea from './Textarea';
import Input from './Input';

class FormElement extends React.Component {
  static contextType = Context;

  renderInput() {
    const { options, name, type } = this.props;
    const { label, showErrorMessage, ...fieldProps } = this.props;
    const { onChange } = this.context;
    const props = {
      ...fieldProps,
      onChange,
      id: `input_${name}`,
    };

    const arrayProps = {
      ...props,
      options,
    };

    const textProps = {
      ...props,
      autoComplete: 'off',
    };

    switch (type) {
      case 'checkbox':
        return <CheckboxList {...arrayProps} />;
      case 'radio':
        return <RadioList {...arrayProps} />;
      case 'select':
        return <Select {...arrayProps} />;
      case 'textarea':
        return <Textarea {...textProps} />;
      default:
        return <Input {...textProps} />;
    }
  }

  render() {
    const { label, name, className } = this.props;
    const { showErrorMessage } = this.context;

    return (
      <div className={`form-element ${className}`}>
        {label && <label htmlFor={`input_${name}`}>{label}</label>}
        <div className="input-wrap">{this.renderInput()}</div>
        {showErrorMessage(name)}
      </div>
    );
  }
}

FormElement.defaultProps = {
  required: false,
};

export default FormElement;

import React from 'react';
import cx from 'classnames';

import { Context, convertOptions } from '../utils';

import Radio from './Radio';
import RadioGroup from './RadioGroup';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import Select from './Select';
import Textarea from './Textarea';
import Input from './Input';

const createComponent = (type, options) => {
  switch (type) {
    case 'checkbox':
      if (options) return CheckboxGroup;
      return Checkbox;
    case 'radio':
      if (options) return RadioGroup;
      return Radio;
    case 'select':
      return Select;
    case 'textarea':
      return Textarea;
    default:
      return Input;
  }
};

class FormElement extends React.Component {
  static contextType = Context;

  getID() {
    const { name } = this.props;
    return `input_${name}`;
  }

  renderInput() {
    const { options, type } = this.props;
    const { label, showErrorMessage, ...fieldProps } = this.props;
    const { onChange } = this.context;
    let props = {
      ...fieldProps,
      onChange,
      id: this.getID(),
    };

    if (type === 'select' || (['checkbox', 'radio'].includes(type) && options)) {
      props = {
        ...props,
        options: options && convertOptions(options),
      };
    }

    if (['checkbox', 'radio'].includes(type) && !options) {
      props = {
        ...props,
        label,
      };
    }

    const InputComponent = createComponent(type, options);

    return <InputComponent {...props} />;
  }

  render() {
    const {
      label, name, className, children, type, options,
    } = this.props;
    const { showErrorMessage } = this.context;

    if (children && typeof children === 'function') return children(this.context);
    return (
      <div className={cx('form-element', className)}>
        {label && (['checkbox', 'radio'].includes(type) ? options : true) && (
          <label htmlFor={this.getID()}>{label}</label>
        )}
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

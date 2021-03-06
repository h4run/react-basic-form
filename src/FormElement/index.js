import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

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
    const {
      label, inputRef, className, inputClassname, ...fieldProps
    } = this.props;
    const { onChange, isValid } = this.context;
    let props = {
      ...fieldProps,
      onChange: (e) => {
        onChange(e);
        if (fieldProps.onChange) {
          fieldProps.onChange(e);
        }
        if (fieldProps.validateOnChange) {
          fieldProps.validateOnChange(isValid(e.target));
        }
      },
      id: this.getID(),
    };

    if (inputClassname) {
      props = { ...props, className: inputClassname };
    }

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

    if (inputRef) {
      props = {
        ...props,
        ref: inputRef,
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

    if (children) return typeof children === 'function' ? children(this.context) : children;
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

FormElement.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ]),
  ),
  label: PropTypes.string,
};

export default FormElement;

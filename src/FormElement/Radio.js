import React from 'react';
import cx from 'classnames';

const RadioOrCheckbox = ({
  defaultValue, label, id, type, ...props
}) => (
  <label className={cx('custom-checkbox-radio', type)}>
    <input {...props} type={type} />
    {label}
    <span className="checkmark" />
  </label>
);

RadioOrCheckbox.defaultProps = {
  type: 'radio',
};

export default RadioOrCheckbox;

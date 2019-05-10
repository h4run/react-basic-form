import React, { useState } from 'react';

import Radio from './Radio';
import Checkbox from './Checkbox';

const RadioGroup = ({
  defaultValue, options, type, name, ...props
}) => {
  if (options.length === 0) return null;

  let initialState = [];
  if (defaultValue) {
    initialState = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }
  const [checkeds, setCheckeds] = useState(initialState);
  const hiddenInput = React.createRef();

  return (
    <div id={props.id} className={`${type}-group`}>
      {options.map((option) => {
        const inputProps = {
          ...props,
          ...option,
          defaultChecked: Array.isArray(defaultValue)
            ? defaultValue.includes(option.value)
            : defaultValue === option.value,
          key: option.value,
        };
        if (type === 'checkbox') {
          return (
            <Checkbox
              {...inputProps}
              onChange={(e) => {
                const { value } = e.target;
                let newCheckeds;
                if (checkeds.includes(value)) {
                  newCheckeds = checkeds.filter(c => c !== value);
                } else {
                  newCheckeds = [...checkeds, value];
                }
                setCheckeds(newCheckeds);

                props.onChange({ target: { name, value: newCheckeds, required: props.required } });
              }}
            />
          );
        }

        return <Radio {...inputProps} name={name} />;
      })}
      {type === 'checkbox' && (
        <input
          ref={hiddenInput}
          name={name}
          type="hidden"
          value={checkeds}
          required={props.required}
        />
      )}
    </div>
  );
};

RadioGroup.defaultProps = {
  type: 'radio',
  options: [],
};

export default RadioGroup;

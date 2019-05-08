const RadioList = ({
  defaultValue, id, options, ...props
}) => {
  if (options.length === 0) return null;

  return (
    <div id={id} className="inline-items">
      {options.map(({ label, value }) => (
        <span className="item-wrap" key={label}>
          <label className={`${props.type} item`}>
            {label}
            <input
              {...props}
              value={value}
              defaultChecked={
                Array.isArray(defaultValue) ? defaultValue.includes(value) : defaultValue === value
              }
            />
            <span className="checkmark" />
          </label>
        </span>
      ))}
    </div>
  );
};

RadioList.defaultProps = {
  type: 'radio',
  options: [],
};

export default RadioList;

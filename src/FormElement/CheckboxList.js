import React from 'react';

import RadioList from './RadioList';

const CheckboxList = props => <RadioList {...props} name={`${[props.name]}[]`} type="checkbox" />;

export default CheckboxList;

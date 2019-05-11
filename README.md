# react-basic-form

---

Form builder for React

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-basic-form.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-basic-form
[download-image]: https://img.shields.io/npm/dm/react-basic-form.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-basic-form

## Install

```bash
npm install --save react-basic-form
```

[![react-basic-form](https://nodei.co/npm/react-basic-form.png)](https://npmjs.org/package/react-basic-form)

## Usage

### Example 1

```js
import React from 'react';
import { render } from 'react-dom';
import Form from 'react-basic-form';
// import 'react-basic-form/dist/style.css'; //optional

render(
  <Form
    onSubmit={data => console.log(data)}
    validations={{
      email: value => emailRegex.test(value),
    }}
    errorMessages={{
      email: 'Please check your email address.',
    }}
  >
    <Form.Element label="Full Name" name="fullname" required />
    <Form.Element label="E-mail" name="email" type="email" required />
    <Form.Submit />
  </Form>,
  container,
);
```

### Example 2

```js
import React from 'react';
import { render } from 'react-dom';
import Form from 'react-basic-form';

render(
  <Form onSubmit={data => console.log(data)}>
    <Form.Element>
      {({ showErrorMessage, onChange }) => (
        <div>
          <input name="fullname" type="text" onChange={onChange} placeholder="Full Name" required />
          {showErrorMessage('fullname')}
        </div>
      )}
    </Form.Element>
    <Form.Submit>
      {({ isLoading }) => (
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending' : 'Send'}
        </button>
      )}
    </Form.Submit>
  </Form>,
  container,
);
```

### Example 3

```js
import React from 'react';
import { render } from 'react-dom';
import Form from 'react-basic-form';

render(
  <Form onSubmit={data => console.log(data)}>
    {({ showErrorMessage, onChange, isLoading }) => (
      <div>
        <div>
          <input name="fullname" type="text" onChange={onChange} placeholder="Full Name" required />
          {showErrorMessage('fullname')}
        </div>
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </div>
    )}
  </Form>,
  container,
);
```

### Example 4

```js
import React from 'react';
import { render } from 'react-dom';
import Form from 'react-basic-form';

render(
  <Form
    onSubmit={(data, submitState) => {
      submitState.start(); // isLoading true
      setTimeout(() => {
        console.log(data);
        submitState.end(); // form reset && isLoading = false
      }, 1000);
    }}
  >
    <Form.Element label="Full Name" name="fullname" required />
    <Form.Submit />
  </Form>,
  container,
);
```

## API

### `Form` props

| Name                | Type                        | Default                     | Description                                                                                           |
| ------------------- | --------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| onSubmit            | (values, submitState) => {} |                             | form submission handler.                                                                              |
| validations         | Object                      | `{}`                        | contains validators for each field.                                                                   |
| errorMessages       | Object                      | `{}`                        | contains error message for each field.                                                                |
| defaultErrorMessage | string                      | `'This field is required.'` | contains error message for all field.                                                                 |
| children            | React.Node or function      |                             | if children is a function this function should return the JSX which contains the form and all inputs. |

### `Form.Element` props

| Name     | Type                                          | Default | Description                                                                                           |
| -------- | --------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| options  | Array(string) or Array(shape({label, value})) |         | when if `type` prop includes `select`,`radio` or `checkbox`, this prop is required                    |
| label    | string                                        |         | if this filled, `Form.Element` will create `label` tag with your string.                              |
| children | React.Node or function                        |         | if children is a function this function should return the JSX which contains the form and all inputs. |

### `Form.Submit` props

| Name         | Type                   | Default     | Description                                                                                           |
| ------------ | ---------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| label        | string                 | `'Send'`    |                                                                                                       |
| loadingLabel | string                 | `'Sending'` |                                                                                                       |
| children     | React.Node or function |             | if children is a function this function should return the JSX which contains the form and all inputs. |

### `children` function arguments

| Name             | Type     | Description |
| ---------------- | -------- | ----------- |
| showErrorMessage | function |             |
| onChange         | function |             |
| isLoading        | boolean  |             |

## Development

```
npm install
npm start
```

## Example

`npm start` and then go to `http://localhost:3001/`

## License

`react-basic-form` is released under the MIT license.

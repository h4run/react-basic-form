import React from 'react';
import { render } from 'react-dom';

import '../../src/style.scss';

import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';

const App = () => (
  <>
    <h1>Form Examples</h1>
    <Example1 />
  </>
);
render(<App />, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';

import Sample from './Sample';

const App = () => (
  <>
    <h1>Form Sample</h1>
    <Sample />
  </>
);
render(<App />, document.getElementById('root'));

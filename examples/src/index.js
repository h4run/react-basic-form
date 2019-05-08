import React from 'react';
import { render } from 'react-dom';

import Sample from './Sample';
import Layout from './Layout';

const App = () => (
  <Layout>
    <h1>Form Sample</h1>
    <Sample />
  </Layout>
);
render(<App />, document.getElementById('root'));

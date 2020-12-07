import React from 'react';
// import { CheckboxWithLabel } from '@examples-hub/sample-react-components-ts';
import {SimpleRTableApp} from './example/RTableApp'

import './index.css';

export function App() {
  return (
    <div>
      <h1>示例 react-table-v6</h1>
      <div>
        {/* <CheckboxWithLabel labelOn='On' labelOff='Off' /> */}
        <SimpleRTableApp />
      </div>
    </div>
  );
}

export default App;

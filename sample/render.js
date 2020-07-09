import React from 'react';
import ReactDOM from 'react-dom';
// import { App } from './demo';
import { RTableExampleListApp as App } from './RTableExampleListApp';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};
render(App);

// if (module.hot) {
//   module.hot.accept('./RTableExampleListApp.js', () => {
//     render(App);
//   });
// }

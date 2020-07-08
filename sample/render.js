import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './demo';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};
render(App);

if (module.hot) {
  module.hot.accept('./demo.js', () => {
    render(App);
  });
}

import React from 'react';
import ReactDOM from 'react-dom';
// import { App } from './demo';
// import { RTableExampleListApp as App } from './RTableExampleListApp';
// import { default as App } from './list/ScrollUpAbsolutePosition';
import { default as App } from './grid-absolute/AbsoluteGridApp';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};
render(App);

if (module.hot) {
  module.hot.accept('./RTableExampleListApp.js', () => {
    render(App);
  });
}

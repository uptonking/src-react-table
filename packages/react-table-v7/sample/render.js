import React from 'react';
import ReactDOM from 'react-dom';
// import { App } from './demo';
import { ExampleListApp as App } from './ExampleListApp';
// import { default as App } from './list/ScrollUpAbsolutePosition';
// import { default as App } from './grid-absolute/AbsoluteGridApp';

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};
render(App);

if (module.hot) {
  module.hot.accept('./ExampleListApp.js', () => {
    render(App);
  });
}

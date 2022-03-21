import React from 'react';
import ReactDOM from 'react-dom';

// import { ExampleListApp as App } from './ExampleListApp';
import { CubsApp as App } from './virtualized-filterable-table-cubs/App';

// import { App } from './demo';
// import { default as App } from './list/ScrollUpAbsolutePosition';
// import { default as App } from './grid-absolute/AbsoluteGridApp';

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  // module.hot.accept('./ExampleListApp.jsx', () => {
  module.hot.accept('./virtualized-filterable-table-cubs/App.jsx', () => {
    render(App);
  });
}

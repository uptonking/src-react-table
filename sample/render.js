import React from 'react';
import ReactDOM from 'react-dom';
// import { App } from './demo';
import { RTableExampleListApp as App } from './RTableExampleListApp';
// import { default as App } from './list/ScrollUpAbsolutePosition';
// import { default as App } from './plugins/App1CustomHooks';
// import { default as App } from './plugins/App2DoublePlugin';
// import { default as App } from './plugins/App3PluginInstance';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};
render(App);

if (module.hot) {
  module.hot.accept('./RTableExampleListApp.js', () => {
    render(App);
  });
}

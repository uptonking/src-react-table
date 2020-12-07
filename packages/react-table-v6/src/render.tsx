import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    render(App);
  });
}

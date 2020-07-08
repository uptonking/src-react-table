import React from 'react';

const routing = {
  default: 'ExampleList',
  about: ' routes.About',
};

export const App = () => {
  return (
    <div>
      <input type='text' />
      <h2>Hello, 世界 20200708 </h2>
    </div>
  );
};

// const rootEle = document.getElementById('app');

// export const render = () => {
//   ReactDOM.render(<App />, rootEle);
// };

// render();

// if (module.hot) {
//   module.hot.accept('./render', () => {
//     require('./render').default();
//   });
// }

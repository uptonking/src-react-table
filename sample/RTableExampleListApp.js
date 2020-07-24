import React, { useState } from 'react';
import * as examples from './index';
import { Title } from './Title';

const exampleNameArr = Object.keys(examples);

export function RTableExampleListApp() {
  // const [curName, setCurName] = useState('');
  const [curName, setCurName] = useState('CSSOnlyResponsiveTable');
  // const [curName, setCurName] = useState('A1Basic');

  const handleClick = name => {
    setCurName(name);
  };

  const CurExampleApp = curName ? examples[curName] : () => <h4>未选择示例</h4>;

  return (
    <div>
      <Title />
      <h2>当前示例: {curName}</h2>
      <div
        style={{
          float: 'left',
          overflow: 'hidden',
          width: 100,
          backgroundColor: 'beige',
          padding: '10px',
        }}
        className='left-toc-placeholder'
      >
        {exampleNameArr.map((name, index) => (
          <div onClick={() => handleClick(name)} key={index + name}>
            <h5 style={{ cursor: 'pointer' }}>{name}</h5>
          </div>
        ))}
      </div>
      {/* width必须存在，height可不存在 */}
      <div
        // style={{ float: 'left', margin: '10px', width: 720 }}
        className='right-comp-placeholder'
      >
        <CurExampleApp />
      </div>
    </div>
  );
}

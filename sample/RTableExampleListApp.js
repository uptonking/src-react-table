import React, { useState } from 'react';
import * as examples from './index';
import { Title } from './Title';

const exampleNameArr = Object.keys(examples);

export function RTableExampleListApp() {
  // const [curName, setCurName] = useState('');
  const [curName, setCurName] = useState('TableTabAccordion');
  // const [curName, setCurName] = useState('A1Basic');

  const handleClick = name => {
    setCurName(name);
  };

  const CurExampleApp = curName ? examples[curName] : () => <h4>未选择示例</h4>;

  return (
    <div style={{ boxSizing: 'border-box' }}>
      <Title />
      <h2>当前示例: {curName}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div
          style={{
            width: 240,
            overflow: 'auto',
            backgroundColor: 'beige',
            // padding: '8px',
          }}
          className='left-toc-placeholder'
        >
          {exampleNameArr.map((name, index) => (
            <div onClick={() => handleClick(name)} key={index + name}>
              <h5 style={{ cursor: 'pointer' }}>{name}</h5>
            </div>
          ))}
        </div>
        <div
          style={{
            // backgroundColor: 'lightyellow',
            margin: '8px',
          }}
          // style={{ float: 'left', margin: '10px', width: 720 }}
          className='right-comp-placeholder'
        >
          <CurExampleApp />
        </div>
      </div>
    </div>
  );
}

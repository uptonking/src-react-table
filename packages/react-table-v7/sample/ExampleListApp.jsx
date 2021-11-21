import React, { useState } from 'react';

import * as examples from '.';

const exampleNameArr = Object.keys(examples);

export function ExampleListApp() {
  // const [curEgName, setCurEgName] = useState('');
  const [curEgName, setCurEgName] = useState('A0Simple');
  // const [curEgName, setCurEgName] = useState('AbsoluteLayoutTable');

  const handleClickEgName = (name) => {
    setCurEgName(name);
  };

  const CurExampleApp = curEgName
    ? examples[curEgName]
    : () => <h4>未选择示例</h4>;

  return (
    <div>
      <h1>examples for list-grid-table</h1>
      <h2>当前示例: {curEgName}</h2>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: 200,
            // 如果设置overflowX为hidden，窄屏幕上这个toc菜单会全部隐藏
            // overflowX: 'hidden',
            backgroundColor: 'beige',
            // padding: '8px',
          }}
          className='left-toc-placeholder'
        >
          {exampleNameArr.map((name, index) => (
            <div onClick={() => handleClickEgName(name)} key={index + name}>
              <h5 style={{ cursor: 'pointer' }}>{name}</h5>
            </div>
          ))}
        </div>
        <div
          style={{
            // backgroundColor: 'lightyellow',
            // maxWidth: '1100px',
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

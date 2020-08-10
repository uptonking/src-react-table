import React, { useState, useRef, useCallback, useMemo } from 'react';
/**
 * 自定义hook作为基础hook，接收传入自定义plugin的逻辑
 * @param {*} options
 * @param {*} plugins
 */
export function useCount(options = {}, plugins = []) {
  const { initialCount = 0 } = options;
  const [count, _setCount] = useState(initialCount);

  const pluginsRef = useRef();
  pluginsRef.current = plugins;

  // 自己实现setCount的功能
  const setCount = useCallback(updater => {
    _setCount(old => {
      let newCount = typeof updater === 'function' ? updater(old) : updater;

      // 调用plugin计算最新newCount状态值
      pluginsRef.current.forEach(plugin => {
        if (plugin.setCount) {
          newCount = plugin.setCount(newCount);
        }
      });
      return newCount;
    });
  }, []);

  const increment = useCallback(() => {
    setCount(old => old + 1);
  }, [setCount]);

  return [count, increment];
}

/**
 * plugin通过object形式创建
 */
export const incrementDoublePlugin = {
  setCount: old => old * 2,
  useInstance: instance => {
    instance.doubleVaule = useMemo(() => instance.count * 2, [instance.count]);
    return instance;
  },
};

export function PluginApp(props) {
  const [count, increment] = useCount({}, [incrementDoublePlugin]);
  return (
    <div>
      <h1>基于hooks的plugin架构2 - 使用对象的属性函数值提供plugin逻辑</h1>
      <button>{count}</button>
      <button onClick={() => increment()}>+1</button>
      {/* <button onClick={() => incrementDouble()}>+2</button> */}
    </div>
  );
}

export default PluginApp;

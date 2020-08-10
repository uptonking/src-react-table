import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
/**
 * 自定义hook作为入口hook，接收自定义plugin对象，
 * react-table v7的useTable采用的这种插件架构
 * @param {*} options 状态初始值和其他值
 * @param {*} plugins 插件对象，属性值也可以是一个hook函数
 */
export function useCount(options = {}, plugins = []) {
  const { initialCount = 1 } = options;
  const [count, _setCount] = useState(initialCount);

  const pluginsRef = useRef();
  pluginsRef.current = plugins;

  // 自己实现setCount的逻辑
  const setCount = useCallback(updater => {
    _setCount(old => {
      let newCount = typeof updater === 'function' ? updater(old) : updater;

      // 调用plugin中的方法计算最新newCount状态值
      pluginsRef.current.forEach(plugin => {
        if (plugin.setCount) {
          newCount = plugin.setCount(newCount);
        }
      });
      return newCount;
    });
  }, []);

  const increment = useCallback(() => {
    setCount(old => old);
  }, [setCount]);

  // 自定义hook最后返回的对象
  let instance = { count, increment };

  instance = pluginsRef.current.reduce((prevValue, plugin) => {
    if (plugin.useInstance) {
      return plugin.useInstance(prevValue);
    }
    return prevValue;
  }, instance);

  return instance;
}

/**
 * plugin通过object形式创建
 */
export const incrementDoublePlugin = {
  /** state数据的具体更新逻辑，自己控制数据更新逻辑 */
  setCount: old => old * 2,
  /** 修改hook输出返回的对象，自定义hook作为插件属性传入  */
  useInstance: instance => {
    instance.doubleValue = useMemo(() => instance.count * 2, [instance.count]);
    return instance;
  },
};

export function PluginApp(props) {
  const { count, increment, doubleValue } = useCount({}, [
    incrementDoublePlugin,
  ]);
  return (
    <div>
      <h1>基于hooks的plugin架构3 - 使用plugin提供的方法修改hook的输出对象</h1>
      <button>{count}</button>
      <button onClick={() => increment()}>*2</button>
      <p>下次双倍值：{doubleValue}</p>
    </div>
  );
}

export default PluginApp;

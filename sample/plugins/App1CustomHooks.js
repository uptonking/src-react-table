import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

/**
 * 自定义hook作为基础hook
 */
export function useCount(options = {}) {
  const { initialCount = 0 } = options;
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => {
    setCount(old => old + 1);
  }, []);

  // return [count, setCount];
  return [count, increment];
}
/**
 * 基于useCount创建新的自定义hook，
 * 下一个示例PluginApp2展示了如何使用plugin的形式提供自定义hook功能的方法
 */
export function useOurCount(options = {}) {
  const [count, increment] = useCount();
  const incrementDouble = useCallback(() => {
    increment();
    increment();
  }, []);

  return [count, increment, incrementDouble];
}

export function PluginApp(props) {
  const [count, increment, incrementDouble] = useOurCount();

  return (
    <div>
      <h1>基于hooks的plugin架构1 - 用自定义hook创建新的自定义hook扩展功能</h1>
      {/* <button onClick={() => setCount(12)}> {count}</button> */}
      <button>{count}</button>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => incrementDouble()}>+2</button>
    </div>
  );
}

export default PluginApp;

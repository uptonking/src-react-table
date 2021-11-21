import React from 'react';

const renderErr = 'Renderer Error ☝️';
/** 更新顶级state的action类型，各个plugin都会dispatch自己类型的action */
export const actions = {
  init: 'init',
};

/** 直接返回输入值的函数，用来渲染默认cell */
export const defaultRenderer = ({ value = '' }) => value;
/** 渲染一个空格转义字符的组件，用来渲染默认header,footer */
export const emptyRenderer = () => <>&nbsp;</>;

/** 表头列默认渲染的组件和样式配置 */
export const defaultColumn = {
  Cell: defaultRenderer,
  width: 150,
  minWidth: 0,
  maxWidth: Number.MAX_SAFE_INTEGER,
};

/** 合并参数对象的所有props，最后返回一个大对象，会单独处理style和className */
function mergeProps(...propList) {
  return propList.reduce((props, next) => {
    const { style, className, ...rest } = next;

    props = {
      ...props,
      ...rest,
    };

    if (style) {
      props.style = props.style
        ? { ...(props.style || {}), ...(style || {}) }
        : style;
    }

    if (className) {
      props.className = props.className
        ? props.className + ' ' + className
        : className;
    }

    if (props.className === '') {
      delete props.className;
    }

    return props;
  }, {});
}

/** 合并prevProps和userProps */
function handlePropGetter(prevProps, userProps, meta) {
  // Handle a lambda, pass it the previous props
  if (typeof userProps === 'function') {
    return handlePropGetter({}, userProps(prevProps, meta));
  }

  // Handle an array, merge each item as separate props
  if (Array.isArray(userProps)) {
    return mergeProps(prevProps, ...userProps);
  }

  // Handle an object by default, merge the two objects
  return mergeProps(prevProps, userProps);
}

/**
 * 一个高阶函数，会返回一个方法，合并输入对象的属性
 */
export const makePropGetter = (hooks, meta = {}) => {
  return (userProps = {}) =>
    [...hooks, userProps].reduce(
      (aac, next) =>
        handlePropGetter(aac, next, {
          ...meta,
          userProps,
        }),
      {},
    );
};

/**
 * 遍历hooks数组，调用每个hook方法，并传入meta数据，返回计算结果
 * @param {*} hooks 函数数组
 * @param {*} initial 初始值
 * @param {*} meta 每个函数调用时会传入的参数数据
 * @param {*} allowUndefined 每个函数调用计算的结果是否可为undefined
 */
export const reduceHooks = (hooks, initial, meta = {}, allowUndefined) =>
  hooks.reduce((aac, next) => {
    const nextValue = next(aac, meta);
    if (process.env.NODE_ENV !== 'production') {
      if (!allowUndefined && typeof nextValue === 'undefined') {
        console.info(next);
        throw new Error(
          'React Table: A reducer hook ☝️ just returned undefined! This is not allowed.',
        );
      }
    }
    return nextValue;
  }, initial);

/**
 * 遍历并调用hooks数组中的方法
 * @param {*} hooks 函数数组
 * @param {*} context 传入函数的第一参数
 * @param {*} meta 传入函数的第二参数
 */
export const loopHooks = (hooks, context, meta = {}) =>
  hooks.forEach((hook) => {
    const nextValue = hook(context, meta);
    if (process.env.NODE_ENV !== 'production') {
      if (typeof nextValue !== 'undefined') {
        console.info(hook, nextValue);
        throw new Error(
          'React Table: A loop-type hook ☝️ just returned a value! This is not allowed.',
        );
      }
    }
  });

/** 保证插件调用的顺序，会检查pluginName名称 */
export function ensurePluginOrder(plugins, befores, pluginName, afters) {
  if (process.env.NODE_ENV !== 'production' && afters) {
    throw new Error(
      `Defining plugins in the "after" section of ensurePluginOrder is no longer supported (see plugin ${pluginName})`,
    );
  }
  const pluginIndex = plugins.findIndex(
    (plugin) => plugin.pluginName === pluginName,
  );

  if (pluginIndex === -1) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`The plugin "${pluginName}" was not found in the plugin list!
This usually means you need to need to name your plugin hook by setting the 'pluginName' property of the hook function, eg:

  ${pluginName}.pluginName = '${pluginName}'
`);
    }
  }

  befores.forEach((before) => {
    const beforeIndex = plugins.findIndex(
      (plugin) => plugin.pluginName === before,
    );
    if (beforeIndex > -1 && beforeIndex > pluginIndex) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          `React Table: The ${pluginName} plugin hook must be placed after the ${before} plugin hook!`,
        );
      }
    }
  });
}

export function functionalUpdate(updater, old) {
  return typeof updater === 'function' ? updater(old) : updater;
}

/**
 * 使用ref保存输入的obj，并返回获取`ref.current`值的方法，是为了避免内存泄漏
 * @param {*} obj 要保存的obj
 */
export function useGetLatest(obj) {
  const ref = React.useRef();
  ref.current = obj;

  return React.useCallback(() => ref.current, []);
}

// SSR has issues with useLayoutEffect still, so use useEffect during SSR
/** 默认使用useLayoutEffect，在SSR中使用useEffect */
export const safeUseLayoutEffect =
  typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/** 挂载后才会执行fn */
export function useMountedLayoutEffect(fn, deps) {
  const mountedRef = React.useRef(false);

  safeUseLayoutEffect(() => {
    if (mountedRef.current) {
      fn();
    }
    mountedRef.current = true;
  }, deps);
}

export function useAsyncDebounce(defaultFn, defaultWait = 0) {
  const debounceRef = React.useRef({});

  const getDefaultFn = useGetLatest(defaultFn);
  const getDefaultWait = useGetLatest(defaultWait);

  return React.useCallback(
    async (...args) => {
      if (!debounceRef.current.promise) {
        debounceRef.current.promise = new Promise((resolve, reject) => {
          debounceRef.current.resolve = resolve;
          debounceRef.current.reject = reject;
        });
      }

      if (debounceRef.current.timeout) {
        clearTimeout(debounceRef.current.timeout);
      }

      debounceRef.current.timeout = setTimeout(async () => {
        delete debounceRef.current.timeout;
        try {
          debounceRef.current.resolve(await getDefaultFn()(...args));
        } catch (err) {
          debounceRef.current.reject(err);
        } finally {
          delete debounceRef.current.promise;
        }
      }, getDefaultWait());

      return debounceRef.current.promise;
    },
    [getDefaultFn, getDefaultWait],
  );
}
/**
 * 多层高阶方法，最终的目标是创建一个组件，并将所有参数instance, column, meta都作为props传给它。
 * 此方法从column.type中去除要渲染的组件类型。
 * @param {*} instance 顶级ref对象
 * @param {*} column 表头列对象
 * @param {*} meta 其他数据或属性
 */
export function makeRenderer(instance, column, meta = {}) {
  return (type, userProps = {}) => {
    // 从column对象中获取要渲染的表头组件，若Comp为代表表头名的string则会直接渲染字符串
    const Comp = typeof type === 'string' ? column[type] : type;
    // console.log('column[type], ', Comp);

    if (typeof Comp === 'undefined') {
      console.info(column);
      throw new Error(renderErr);
    }

    return flexRender(Comp, { ...instance, column, ...meta, ...userProps });
  };
}

export function flexRender(Comp, props) {
  return isReactComponent(Comp) ? <Comp {...props} /> : Comp;
}

function isReactComponent(component) {
  return (
    isClassComponent(component) ||
    typeof component === 'function' ||
    isExoticComponent(component)
  );
}

function isClassComponent(component) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isReactComponent;
    })()
  );
}

/** 判断组件是否是React.memo/forwardRef包裹的组件 */
function isExoticComponent(component) {
  return (
    typeof component === 'object' &&
    typeof component.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description)
  );
}

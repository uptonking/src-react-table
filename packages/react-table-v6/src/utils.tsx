import React from 'react';
import classnames from 'classnames';

// 本文件全是工具方法

export default {
  get,
  set,
  takeRight,
  last,
  orderBy,
  range,
  remove,
  clone,
  getFirstDefined,
  sum,
  makeTemplateComponent,
  groupBy,
  isArray,
  splitProps,
  compactObject,
  isSortingDesc,
  normalizeComponent,
  asPx,
};

/**
 *从对象obj中取出path路径对应的属性值
 * @param obj  从中取属性值的对象
 * @param path  属性路径
 * @param def 属性值不存在时的默认返回值
 */
function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  const pathObj = makePathArray(path);
  // console.log('pathObj, ', pathObj);

  let val;
  try {
    val = pathObj.reduce((current, pathPart) => current[pathPart], obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

/**
 * 给对象obj的path路径对应的属性设置属性值
 * @param obj 要设置属性值的对象
 * @param path 属性路径
 * @param value 属性值
 */
function set(obj = {}, path, value) {
  const keys = makePathArray(path);
  let keyPart;
  let cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  const start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

/**
 * 创建一个数组，数组元素分别是0,1,...,n-1
 * @param n 数组元素个数
 */
function range(n) {
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs, indexKey) {
  return arr.sort((rowA, rowB) => {
    for (let i = 0; i < funcs.length; i += 1) {
      const comp = funcs[i];
      const desc = dirs[i] === false || dirs[i] === 'desc';
      const sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    // Use the row index for tie breakers
    return dirs[0]
      ? rowA[indexKey] - rowB[indexKey]
      : rowB[indexKey] - rowA[indexKey];
  });
}

function remove(a, b) {
  return a.filter((o, i) => {
    const r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(
      JSON.stringify(a, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        }
        return value;
      }),
    );
  } catch (e) {
    return a;
  }
}

/**
 * 返回传入参数数组中的第一个
 * @param args 传入的参数
 */
function getFirstDefined(...args) {
  for (let i = 0; i < args.length; i += 1) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * 创建一个组件的模板方法
 * @param compClass  添加到组件最外层div的className
 * @param displayName  组件名称
 */
function makeTemplateComponent(compClass, displayName) {
  if (!displayName) {
    // throw new Error('No displayName found for template component:', compClass);
    throw new Error('No displayName found for template component:' + compClass);
  }
  const cmp = ({ children, className, ...rest }) => (
    <div className={classnames(compClass, className)} {...rest}>
      {children}
    </div>
  );
  cmp.displayName = displayName;
  return cmp;
}

function groupBy(xs, key) {
  return xs.reduce((rv, x, i) => {
    const resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function asPx(value) {
  value = Number(value);
  return Number.isNaN(value) ? null : `${value}px`;
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj)
    .join('.')
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.');
}

function flattenDeep(arr, newArr = []) {
  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (let i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps({ className, style, ...rest }) {
  return {
    className,
    style,
    rest: rest || {},
  };
}

/**
 * 遍历传入的对象obj的属性，若属性存在于自身且属性值不为undefined，则浅拷贝属性值到新对象，最后返回新对象
 * @param obj
 */
function compactObject(obj) {
  const newObj = {};
  if (obj) {
    Object.keys(obj).map((key) => {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        obj[key] !== undefined &&
        typeof obj[key] !== 'undefined'
      ) {
        newObj[key] = obj[key];
      }
      return true;
    });
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp, params = {}, fallback = Comp) {
  return typeof Comp === 'function' ? <Comp {...params} /> : fallback;
}

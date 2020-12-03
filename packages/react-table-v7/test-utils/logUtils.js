/**
 * find and filter (thus causing data loss) a cyclic reference
 * by using the `replacer` parameter of `JSON.stringify()`.
 * eg: JSON.stringify(circularReference, getCircularReplacer());
 */
export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

/**
 * 打印序列化后的对象到控制台，打印的是obj对象当前位置状态的值，而不是obj最新的值
 * @param msg obj的描述信息
 * @param obj 要打印的对象
 */
export function logObjSer(
  msg = '',
  obj = { WARNING: ': 未传入obj参数让logObjSer(msg,obj)方法打印' },
) {
  console.log(
    msg,
    // console.log(JSON.parse(JSON.stringify(obj, getCircularReplacer()))),
    JSON.parse(JSON.stringify(obj)),
  );
}

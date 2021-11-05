// typeof 为 object 的对象有 RegExp Date null Object，通过改变toString的this指向为value，读出[object Type]，再转化为具体类型
export const typeOf = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};


// 深拷贝
export const deepClone = (target, map = new WeakMap()) => {
  // 循环引用标记
  if(map.get(target)) {
    return target;
  }
  const type = typeOf(target);
  // 内置对象
  if(['regexp', 'date'].includes(type)) {
    // 创建一个新的特殊对象(正则类/日期类)的实例
    return new target.constructor(target);
  }
  if(['object', 'array', 'function'].includes(type)) {
    map.set(target,true);
    const cloneTarget = type === 'array' ? [] : {};
    for(let prop in target) {
      if(target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  }
  // 基本类型
  return target;
};

// 合并对象 两对象键取并集，值以后者为准
// 两对象键取交集,值以后者为准

// 合并对象 两对象键和类型以前者为准，值以后者为准（如果有）
export const merge = (origin, standard) => Object.entries(origin).reduce((acc, [key, value]) => {
  const standard_value = standard[key], type = typeOf(value);
  if(standard_value && type === typeOf(standard_value)) {
    if(['object', 'array'].includes(type)) {
      acc[key] = templating(value, standard_value)
    } else {
      acc[key] = deepClone(standard_value)
    }
  } else {
    acc[key] = deepClone(value)
  }
  return acc;
}, {});


// 对比对象数组是否一致
export const deepCompare = (x, y) => {
  const type = typeOf(x);
  if(type !== typeOf(y)) return false;
  if(['null', 'undefined', 'string', 'boolean'].includes(type)) {
    return Object.is(x, y);
    // 可判断NaN
  } else if(['symbol', 'function'].includes(type)) {
    return String(x) === String(y);
    // regexp date
  } else {
    const x_entries = Object.entries(x), y_key = Object.keys(y);
    return x_entries.length === y_key.length 
      ? x_entries.every(([key, value]) => y_key.includes(key) && deepCompare(value, y[key]))
      : false;
  }
}



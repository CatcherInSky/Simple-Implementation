// 数组原型方法
Array.prototype.forEach2 = function(callback, thisArg) {
  if(this == null) {
    throw new TypeError('this is null or not defined');
  }
  if(typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);  // this 就是当前的数组
  const len = O.length >>> 0;  // 无符号右移0位，本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0
  let k = 0;
  while(k < len) {
    if(k in O) {
      callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
};

Array.prototype.map2 = function(callback, thisArg) {
  if(this == null) {
    throw new TypeError('this is null or not defined');
  }
  if(typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0, res = [];
  while(k < len) {
    if(k in O) {
      res[k] = callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
  return res;
};

Array.prototype.filter2 = function(callback, thisArg) {
  if(this == null) {
    throw new TypeError('this is null or not defined');
  }
  if(typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0, res = [];
  while(k < len) {
    if(k in O) {
      if(callback.call(thisArg, O[k], k, O)) {
        res.push(O[k]);                
      }
    }
    k++;
  }
  return res;
};

Array.prototype.some2 = function(callback, thisArg) {
  if(this == null) {
    throw new TypeError('this is null or not defined');
  }
  if(typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  while(k < len) {
    if(k in O) {
      if(callback.call(thisArg, O[k], k, O)) {
        return true;
      }
    }
    k++;
  }
  return false;
};

Array.prototype.reduce2 = function(callback, initialValue) {
  if(this == null) {
    throw new TypeError('this is null or not defined');
  }
  if(typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0, acc;
  
  if(arguments.length > 1) {
    acc = initialValue;
  } else {
    // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
    while(k < len && !(k in O)) {
      k++;
    }
    if(k > len) {
      throw new TypeError( 'Reduce of empty array with no initial value' );
    }
    acc = O[k++];
  }
  while(k < len) {
    if(k in O) {
      acc = callback(acc, O[k], k, O);
    }
    k++;
  }
  return acc;
};

// 数组去重
export const unique = arr => {
  const map = new Map(), res = [];
  arr.forEach(it => {
    if(!map.has(it)) {
      map.set(it, true);
      res.push(it);
    }
  });
  return res;
};
// 数组扁平化
export const flatten = (arr) => {  
  return arr.reduce((result, item)=> {
    // [1].concat([2,3]) === [1].concat(2,3)
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};
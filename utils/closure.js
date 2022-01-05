
/**
 * 防抖
 * 对于设定的间隔时间（通常为毫秒）内的交互，只响应最新的，之前的全部忽略掉
 * @param {Function} fn 需要包装的函数
 * @param {number} delay 延迟执行时间(ms)，默认: 200
 */
const debounce = (fn, delay = 200) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 * 限制一个函数在一定时间内只能执行一次, 控制调用的频率
 * @param {Function} fn 需要包装的函数
 * @param {number} delay 执行最高频率(ms)，默认: 200
 */
const throttle = (fn, delay = 200) => {
  let canRun = true;
  return (...args) => {
    if(!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay);
  };
}

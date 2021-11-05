
/**
 * 防抖
 * 
 * @param {Function} fn 需要包装的函数
 * @param {number} delay 延迟执行时间(ms)，默认: 200
 */
export const throttle = (fn, delay = 200) => {
  let timeout = null;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

/**
 * 节流
 * 
 * @param {Function} fn 需要包装的函数
 * @param {number} delay 执行最高频率(ms)，默认: 200
 */
export const debounce = (fn, delay = 200) => {
  let canRun = true;
  return () => {
    if(!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, delay);
  };
}

// 只执行一次
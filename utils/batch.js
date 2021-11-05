/**
 * @param {object} param 批量函数
 * fn: 需要执行的函数
 * params: 对象数组，每个执行的参数
 * size： 每个分包的大小，默认5
 * step：每个分包执行执行结束后执行的函数
 * success：执行成功队列
 * fail：执行失败队列
 * last：执行结束队列-> Promise.finally
 */
export const batch = async({
  fn,
  params,
  size = 5,
  before = (params, size) => {},
  step = (res, step) => {},
  success = (success_result) => {},
  fail = (fail_result) => {},
  last = (success_result, fail_result) => {},
}) => {
  let success_result = [],
    fail_result = [],
    index = 0;

  before(params, size);

  const request = (fn, param, index) =>
    new Promise((resolve, reject) => {
      fn(param, index)
        .then(res => resolve({...res, index}))
        .catch(err => reject({...err, index}));
    });

  for(let i = 0, times = Math.ceil(params.length / size); i < times; i++) {
    await Promise.allSettled(
      params
        .slice(i * size, (i + 1) * size)
        .map(param => request(fn, param, index++))
    ).then(res => {
      // 分成成功和失败两个队列
      // 成功改变row，并从队列中移除
      // 失败报错，并保留
      res.forEach(item => {
        if(item.status === 'fulfilled') {
          success_result.push(item.value);
        } else {
          fail_result.push(item.reason);
        }
      });

      step(res, (i + 1) * size);
    });
  }

  success(success_result);

  fail(fail_result);

  last(success_result, fail_result);
};

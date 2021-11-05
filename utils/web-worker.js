/**
 * @author cxzhang(zhangchunxiang@4399.com)
 * 
 * 开启新线程进行计算，避免阻塞渲染
 */

/**
   * 创建一个新的worker线程
   * @param {String} string web worker 内部使用的方法的字面值 
   */
const createWorker = (string) => {
  var blob = new Blob([`(() => {${string}})()`]);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  // 释放 URL.createObjectURL() 创建的 URL 对象，通知浏览器不再保持对该 URL 对象的引用
  URL.revokeObjectURL(blob);
  return worker;
};
  /**
   * 在创建web worker，并完成计算工作，异步返回计算结果
   * @param {Function} fn 计算函数，返回计算结果 
   * @param {any} params 计算函数的参数
   * @param {Object} env 作为web worker的全局变量，属性的键为变量名， 值为常量或函数，
   */
export const computeWorker = (fn = () => {}, params, env = {}) => {
  window.console.time(`Web Worker ${fn.name}`);
  // 将参数，方法转换成字面值，传入web worker
  const handler = `const func = ${fn};`;
  const environments = Object.keys(env).reduce((total, key) => {
    total += `const ${key} = ${env[key].toString()};`;
    return total;
  }, '');
  const message = `
        self.onmessage = ({ data: { params } }) => {
            try {
                let data = func(params);
                self.postMessage({code: 0, data});
            } catch(e) {
                self.postMessage({code: -1, err: e});
            }
        }
    `;
  let worker = createWorker(`${environments}${handler}${message}`);
  return new Promise((resolve, reject) => {
    worker.postMessage({params});
    worker.onmessage = ({data: {code, data, err}}) => {
      window.console.timeEnd(`Web Worker ${fn.name}`);
      if(code == 0) {
        resolve(data);
      } else {
        reject(err);
      }
      worker.terminate();
    };
    worker.onerror = (err) => {
      window.console.timeEnd(`Web Worker ${fn.name}`);
      reject(err);
      worker.terminate();
    };
  });
};
const { workerData, parentPort } = require('worker_threads');
let num = workerData;//获取参数
let res = fib(num);
parentPort.postMessage(res); //向主线程返回结果

function fib (n) {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

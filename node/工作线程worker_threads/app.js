'use strict';

const { Worker } = require('worker_threads');

const Koa = require('koa');
const Router = require('koa-router') 

const app = new Koa();
const router = new Router();

app.use(router.routes());

//用于测试主线程是否被阻塞
router.get('/test', async (ctx, next) => {
  ctx.body = 'test';
});

router.get('/fib',async (ctx,next)=>{
  let n = ctx.query.n;
  ctx.body = fib(n);
})

router.get('/asyncFib',async (ctx,next)=>{
  let n = ctx.query.n;
  ctx.body = await asyncFib(n);
})

app.listen(3000);
console.log('http://127.0.0.1:3000');


function fib (n) {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

async function asyncFib (n) {
  let worker = new Worker('./fib.js', { workerData: n });
  return new Promise((resolve) => {
    worker.on('message', (val) => {
      resolve(val); //接收工作线程计算完毕后返回的结果
    });
  });
}
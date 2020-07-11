'use strict';

const Subscription = require('egg').Subscription;

class Incr extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', //
      type: 'all',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { app } = this;
    const lockKey = app.config.lock.key;
    const MIN_TTL = 5;
    const MAX_TTL = 30;
    const value = Math.random();
    const res = await this.app.redis.set(lockKey, value, 'ex', MAX_TTL, 'nx');
    if (res === 'OK') {
      this.logger.info(`进程${process.pid} 获取锁`);
      await this.doSomething();
      await sleep(MIN_TTL);
      // 解锁
      await this.app.redis.unlock(lockKey, value);
    } else {
      this.logger.info(`进程${process.pid} 未获取锁`);
    }
  }

  async doSomething() {
    const key = this.app.config.incrKey;
    const num = await this.app.redis.incr(key);
    this.logger.info(`自增值 ${num}`, `当前秒数：${new Date().getSeconds()}`);
  }
}

function sleep(second) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
}

module.exports = Incr;

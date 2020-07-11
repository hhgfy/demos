'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }


  async willReady() {

    this.app.redis.defineCommand('unlock', {
      numberOfKeys: 1,
      lua: `
      if redis.call("get",KEYS[1]) == ARGV[1] then
        return redis.call("del",KEYS[1])
      else
        return 0
      end`,
    });
  }

  async didReady() {
    // 应用已经启动完毕
  }
}

module.exports = AppBootHook;


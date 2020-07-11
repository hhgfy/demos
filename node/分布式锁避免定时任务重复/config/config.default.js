/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // appInfo.name = `p${process.pid}`;
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594093295714_9485';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.incrKey = 'incr';

  config.lock = {
    key: 'lock',
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};

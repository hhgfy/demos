/* eslint valid-jsdoc: "off" */

'use strict';
// const qs = require('querystring');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590651768181_1129';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [],
      },
    },
  // generateId: req => {
  //   const data = qs.parse(req.url.split('?')[1]);
  //   return data.userId; // custom id must be unique
  // },
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

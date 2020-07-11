'use strict';
/**
 * 实验功能，不可用于生产环境
 */

//根目录下放置此文件
require('egg').start().then(app => {
  const port = 7001;
  app.listen(port);
});

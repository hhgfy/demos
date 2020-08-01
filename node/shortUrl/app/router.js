'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.url.index);

  router.post('/api/create', controller.url.create);

  router.get(/\/[0-9a-zA-Z]+/, controller.url.find);
};


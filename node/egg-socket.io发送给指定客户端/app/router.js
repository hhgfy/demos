'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/login', controller.home.login);
  router.get('/push', controller.home.push);
  router.get('/test', controller.home.test);
};

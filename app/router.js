'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/account/detail', controller.account.detail);
  router.post('/account/create', controller.account.create);
  router.post('/account/update', controller.account.update);
  router.post('/account/delete', controller.account.delete);
};

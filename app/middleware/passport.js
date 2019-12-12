'use strict';

module.exports = (_, app) => {
  return async function(ctx, next) {
    await next();
    const { authorization } = ctx.headers;
    const exceptedUrls = [ '/account/login' ];
    if (exceptedUrls.indexOf(ctx.request.url) !== -1) {
      return;
    }
    if (!authorization) {
      ctx.body = { code: 4000, message: '请登录', data: null };
      return;
    }
    const loginInfo = await app.redis.get(authorization);
    if (!loginInfo) {
      ctx.body = { code: 4000, message: '登录失效，请重新登录', data: null };
    }
  };
};

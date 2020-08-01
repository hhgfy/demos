'use strict';

module.exports = app => {
  return async function handleError(ctx, next) {
    try {
      await next();
    } catch (error) {
      if (error.status === 422) {
        ctx.status = 200;
        ctx.body = app.errCode.paramError;
        ctx.body.msg = `${error.message}\n${JSON.stringify(error.errors)}`;
        return;
      }
      ctx.logger.error(error);
      ctx.body = ctx.errCodes.internalServerError;
      if (process.env.EGG_SERVER_ENV !== 'production') {
        ctx.body.msg = `${error.message}\n${JSON.stringify(error.errors)}`;
      }
    }
  };
};

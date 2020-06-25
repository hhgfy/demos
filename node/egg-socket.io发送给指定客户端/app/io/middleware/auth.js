'use strict';

module.exports = app => {
  return async (ctx, next) => {
    // connect
    if (!ctx.session.user) return;
    const key = `${ctx.enums.prefix.socketId}${ctx.session.user.id}`;
    const MAX_TTL = 24 * 60 * 60;// 最大过期时长，兜底用
    await app.redis.set(key, ctx.socket.id, 'EX', MAX_TTL);

    await next();

    // disconnect
    await app.redis.del(key);

  };
};

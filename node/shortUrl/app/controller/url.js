'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async create() {
    const { ctx, app } = this;
    ctx.validate({
      longUrl: 'url',
    });

    const short = await ctx.service.url.create(ctx.request.body.longUrl);

    ctx.body = app.errCode.success;
    ctx.body.data = {
      url: `${app.config.baseUrl}/${short}`,
    };
  }

  async find() {
    const { ctx } = this;
    const longUrl = await ctx.service.url.find(ctx.path.slice(1));
    if (longUrl) {
      ctx.logger.info(`redirect to:  ${longUrl}`);
      ctx.redirect(longUrl);
    } else {
      ctx.status = 404;
      ctx.body = 'not found';
    }
  }
}

module.exports = UrlController;

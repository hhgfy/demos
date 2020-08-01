'use strict';
const Service = require('egg').Service;
const murmurhash = require('murmurhash');
const base62 = require('base62/lib/ascii');


class UrlService extends Service {

  /**
   * 生成
   * @param {*} longUrl
   * @return {string} 生成的短链
   */
  async create(longUrl) {
    const shortUrl = this._hash(longUrl);
    return await this._gen(longUrl, shortUrl);
  }

  /**
   * 插入数据
   * @param {*} longUrl
   * @param {*} shortUrl
   */
  async _gen(longUrl, shortUrl) {
    const { ctx } = this;
    try {
      await ctx.model.Url.create({
        shortUrl,
        longUrl,
      });
      ctx.logger.info(`生成短链接\n${longUrl}\n${shortUrl}`);
    } catch (error) { // TODO : 不用异常处理逻辑
      if (error.name === 'SequelizeUniqueConstraintError') {
        const item = await ctx.model.Url.findOne({
          attributes: [ 'shortUrl' ],
          where: {
            shortUrl,
            longUrl,
          },
        });
        if (!item) { // 发生hash冲突
          this.logger.warn('hash冲突');
          // 分配一个新的短链，类似开地址法的线性探测
          const newShortUrl = this._hash(shortUrl);
          return this._gen(longUrl, newShortUrl);
        }
        // 该长链已经生成过短链
        ctx.logger.info(`重复生成短链接\n${longUrl}\n${shortUrl}`);
      } else {
        ctx.logger.error(error);
        ctx.throw('生成异常', error);
      }

    }
    return shortUrl;
  }

  /**
   * hash生成短链 (使用类方法便于测试时mock)
   * @param {*} url
   */
  _hash(url) {
    return base62.encode(murmurhash.v3(url, Math.random()));
  }


  /**
   * 根据短链查询
   * @param {*} shortUrl
   * @return {string|null}
   */
  async find(shortUrl) {
    const { ctx } = this;
    const res = await ctx.model.Url.findOne({
      attributes: [ 'shortUrl', 'longUrl' ],
      where: {
        shortUrl,
      },
    });
    return res ? res.longUrl : null;
  }
}


module.exports = UrlService;

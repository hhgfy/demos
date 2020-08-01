'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  beforeEach(async () => {
    await app.model.Url.destroy({ where: {} });
  });

  it('无冲突', async () => {
    const ctx = app.mockContext();
    const URL = 'https://www.baidu.com';
    const shortUrl = await ctx.service.url.create(URL);

    const res = await app.httpRequest().get(`/${shortUrl}`);
    // console.log(JSON.stringify(res));
    assert(res.status === 302);
    assert(res.header.location === URL);
  });

  it('重复的长链接', async () => {
    const ctx = app.mockContext();
    const URL = 'https://www.baidu.com';
    const shortUrl1 = await ctx.service.url.create(URL);
    const shortUrl2 = await ctx.service.url.create(URL);

    assert(await ctx.model.Url.count() === 1);
    assert(shortUrl1 === shortUrl2);
    const res = await app.httpRequest().get(`/${shortUrl1}`);
    assert(res.status === 302);
    assert(res.header.location === URL);
  });

  it('不同长链接的哈希冲突', async () => {
    const ctx = app.mockContext();
    const URL1 = 'https://www.baidu.com';
    const URL2 = 'https://httpbin.org';
    const MOCK_VALUE1 = 'mockHashValue1';
    const MOCK_VALUE2 = 'mockHashValue2';
    let num = 1;
    // 前两次生成相同hash值，产生冲突
    // 第三次生成新的hash值
    app.mockService('url', '_hash', () => {
      if (num === 3) return MOCK_VALUE2;
      num++;
      return MOCK_VALUE1;
    });

    const shortUrl1 = await ctx.service.url.create(URL1);
    const shortUrl2 = await ctx.service.url.create(URL2);

    assert(await ctx.model.Url.count() === 2);
    assert(shortUrl1 === MOCK_VALUE1);
    assert(shortUrl2 === MOCK_VALUE2);
    const res = await app.httpRequest().get(`/${shortUrl1}`);
    assert(res.status === 302);
    assert(res.header.location === URL1);
  });

});

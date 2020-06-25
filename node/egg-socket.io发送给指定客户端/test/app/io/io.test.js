'use strict';

const egg = require('egg-mock');
const assert = require('assert');
// const fs = require('fs');
const ioc = require('socket.io-client');
const superAgent = require('superagent');

// 见 https://github.com/eggjs/egg-mock/blob/master/lib/cluster.js#L65
const basePort = 17001;

function client(opts = {}) {
  let url = 'http://127.0.0.1:' + basePort;
  if (opts.query) {
    url += '?' + opts.query;
  }
  return ioc(url, opts);
}

async function sleep(second) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
}


describe('test/socketio.test.js', () => {

  it('should start http server', async () => {
    const app = egg.cluster({ port: basePort });
    await app.ready();

    const res = await superAgent.get(`http://127.0.0.1:${basePort}/test`);
    assert(res.text === 'test');

    await app.close();
  });

  it('should message sent to the specified client', async () => {
    const app = egg.cluster({ port: basePort });
    await app.ready();

    const pass = [ false, false ];
    // socket client1
    const res1 = await app.httpRequest().get('/login?id=100&name=aaa').expect(200);
    const cookie1 = res1.headers['set-cookie'].join(';');// 获取已经设置过session的cookie
    const client1 = client({ extraHeaders: { cookie: cookie1, port: basePort } });
    client1.on('error', err => console.error(err));
    client1.on('connect', () => { console.error('client1 on connect '); });
    client1.on('disconnect', () => { });
    client1.on('message', msg => {
      console.log('client1 on message: ', msg);
      assert(msg === 'msg1');
      pass[0] = true;
      client1.close();
    });

    // socket client2
    const res2 = await app.httpRequest().get('/login?id=200&name=bbb').expect(200);
    const cookie2 = res2.headers['set-cookie'].join(';');
    const client2 = client({ extraHeaders: { cookie: cookie2, port: basePort } });
    client2.on('error', err => console.error(err));
    client2.on('connect', () => { console.error('client2 on connect '); });
    client2.on('message', msg => {
      console.log('client2 on message: ', msg);
      assert(msg === 'msg2');
      pass[1] = true;
      client2.close();
    });

    while (client1.disconnected || client2.disconnected) {
      await sleep(0.5);// 等待客户端完成连接
    }
    // 分别向id为 100 和 200 的socket客户端发送不同的消息
    await app.httpRequest().get('/push?targetUserId=100&msg=msg1').expect(200);
    await app.httpRequest().get('/push?targetUserId=200&msg=msg2').expect(200);

    await sleep(0.5);// 等待推送消息
    pass.forEach(val => assert(val === true));
  });


});

- 测试
  - `npm run start1`
  - `npm run start2`

观察控制台结果

当两进程启动时间相差超过 `incr.js` 的 MIN_TTL 时，会出现重复执行

如果未超过，则只有一个进程获取锁
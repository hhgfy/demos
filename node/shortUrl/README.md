## 准备
- Node.js > 8.0
- MySQL

## QuickStart

1. 创建数据库
```sql
CREATE DATABASE  IF NOT EXISTS shortUrl  DEFAULT CHARACTER SET utf8mb4;
```

2. 安装依赖
```
npm i
```

3. 建表

需要先修改database目录中的`config.json`
```
npx sequelize db:migrate
```

4. 启动

修改配置文件

```sh
npm run dev
```

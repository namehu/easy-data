/**
 * Created by xiang.hu on 2018/1/4.
 */
// node 后端服务器
const userApi = require('./api/userApi');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 后端api路由
app.use('/api/user', userApi);

const port = 3000;
// 监听端口
app.listen(port);
console.log(`[INFO] ---- EXPRESS STARTED SUCCESSFULL AND LISTEN PORT IN ${port}`);

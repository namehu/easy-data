/**
 * Created by xiang.hu on 2018/1/4.
 */
// node 后端服务器

import userApi from './api/userApi';
// const fs = require('fs');
// const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');

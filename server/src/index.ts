import express from 'express';
import bodyParser from 'body-parser';
import projectController from './controllers/ProjectController';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 后端api路由
app.use('/api/project', projectController);

const port = 3000;
// 监听端口
app.listen(port);
console.log(`[INFO] ---- EXPRESS STARTED SUCCESSFULL AND LISTEN PORT IN ${port}`);
import express, { Request, Response } from 'express';
// import ProjectEntity from '../entitys/ProjectEntity';
import { getHttpRequestParams, httpResponse } from './UntilsController';
import ProjectService from '../services/ProjectService';
import ProjectEntity from '../entitys/ProjectEntity';

const router = express.Router();
const projectService = new ProjectService();

class Test {
  name: string;
  id: number;
  constructor(private url: string) {}
}

// 查询接口
router.get('/query', (req: Request, res: Response) => {
  const entity = new ProjectEntity();
  const params = <ProjectEntity>getHttpRequestParams(req, entity);
  const test = new Test('http://');
  test.name = 'aa';
  console.log(test);
  projectService.query(params).then((result) => {
    res.json(httpResponse(result));
  });
});

export default router;
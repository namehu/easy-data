import express from 'express';

const router = express.Router();

// 查询接口
router.get('/query', (req, res) => {
  return res.json('123455');
  // const params = getHttpRequestParams(req, new ProjectMap());
  // projectService.query(params).then((result) => {
  //   res.json(httpResponse(result));
  // });
});

export default router;
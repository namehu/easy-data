/**
 * Created by xiang.hu on 2018/1/4.
 */
const express = require('express');
const projectService = require('../service/ProjectService');
const ProjectMap = require('../characterMap/ProjectMap');
const { getHttpRequestParams, httpResponse } = require('./util');

const router = express.Router();

// 查询接口
router.get('/query', (req, res) => {
  const params = getHttpRequestParams(req, new ProjectMap());
  projectService.query(params).then((result) => {
    res.json(httpResponse(result));
  });
});

// 增加用户接口
router.post('/add', (req, res) => {
  const params = getHttpRequestParams(req, new ProjectMap());
  projectService.add(params).then((data) => {
    res.json(httpResponse(data));
  });
});


router.post('/update', (req, res) => {
  const params = getHttpRequestParams(req, new ProjectMap());
  projectService.update(params).then((data) => {
    res.json(httpResponse(data));
  });
});

router.post('/delete', (req, res) => {
  const params = getHttpRequestParams(req, new ProjectMap());
  projectService.remove(params.id).then((data) => {
    res.json(httpResponse(data));
  });
});

module.exports = router;

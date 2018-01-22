/**
 * Created by xiang.hu on 2018/1/4.
 */
const express = require('express');
const $sql = require('../sql');
const conn = require('../mysql');

const router = express.Router();

// 连接数据库

const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败',
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.post('/addUser', (req, res) => {
  const sql = $sql.user.add;
  const params = req.body;
  console.log(params);
  conn.query(sql, [params.username, params.age], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;

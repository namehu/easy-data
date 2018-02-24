const resCode = require('../responseCode');

const responseObject = {
  code: resCode.SUCCESS,
  message: 'success',
};

/**
 * 获取http请求参数
 * @param {HttpRequestObject} req  http请求对象
 * @param {sqlMapObject} map 数据库映射字段
 */
exports.getHttpRequestParams = (req, map) => {
  const method = req.method;
  let params = {};
  if (method === 'GET') {
    params = req.query;
  } else if (method === 'POST') {
    if (Object.keys(req.body || {}).length) params = req.body;
    else if (Object.keys(req.params || {}).length) params = req.params;
  }

  if (map) { // 映射数据字段
    Object.keys(map).forEach((k) => {
      if (params[k]) map[k] = params[k];
    });
    params = map;
  }
  return params;
};

/**
 * 封装格式化http数据
 * @param {Object} result 
 */
exports.httpResponse = result => Object.assign({}, responseObject, result);

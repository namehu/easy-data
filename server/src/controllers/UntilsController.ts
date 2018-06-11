import { Request } from 'express';

/**
 * 获取请求参数
 * @param req expressRequest
 * @param entity 实体 可选
 */
export function getHttpRequestParams(req: Request, entity?: Entity) {
  const method = req.method;
  let params: Entity;
  if (method === 'GET') {
    params = req.query;
  } else if (method === 'POST') {
    if (Object.keys(req.body || {}).length) params = req.body;
    else if (Object.keys(req.params || {}).length) params = req.params;
  }

  if (entity) { // 映射数据字段
    Object.keys(params).forEach((k) => {
      if (entity[k]) entity[k] = params[k];
    });
    params = entity;
  }
  return params;
}

/**
 * 获取响应
 *
 * @export
 * @param {Entity} [result] 响应结果
 * @returns {Object} 响应对象
 */
export function httpResponse(result?: Entity): Object {
  return Object.assign({}, {
    code: 200,
    message: 'success',
  }, result);
}
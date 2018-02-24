module.exports = {
  SUCCESS: 200, // 请求正常返回
  BAD_REQUEST: 400, // 客户端请求参数有误
  UNAUTHORIZED: 401, // 未授权
  FORBIDDEN: 403, // 服务器文件损坏或者路径访问许可问题
  NOT_FOUND: 404, // 资源不存在
  METHOD_NOT_ALLOW: 405, // 方法不允许
  REQUEST_TIME_OUT: 408, // 请求超时
  SERVER_ERROR: 500, // 服务器错误
};

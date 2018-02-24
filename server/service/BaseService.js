const BaseDao = require('../dao/BaseDao');
const moment = require('moment');

const baseDao = new BaseDao();
/** 
 * BaseService
 * @description 基础的service对象
 * @version 1.0.0
 * @name Frank.hu
*/
function BaseService() {
  /** 
  * 查询方法
  */
  BaseService.prototype.query = sqlMap => baseDao.query(sqlMap).then(result => ({
    data: result,
  })).catch(() => ({
    code: 500,
    message: 'Query Datebase Occured Problem',
  }));

  /** 
   * 新增方法
  */
  BaseService.prototype.add = sqlMap => baseDao.add(sqlMap).then(result => ({
    data: result,
  })).catch(() => ({
    code: 500,
    message: 'Insert Datebase Occured Problem',
  }));

  /**
   * 删除
   * @param {Ojbect} condition 
   */
  BaseService.prototype.delete = condition => baseDao.delete(condition);

  /**
   * 将数据库字段处理成对象字段
   * @param {Array || Object } data 
   */
  BaseService.prototype.convertSqlToJs = (data) => {
    if (data instanceof Array) {
      return data.map(v => this.convertSqlToJs(v));
    } else if (data instanceof Object) {
      const o = {};
      Object.keys(data).forEach((k) => {
        const na = String(k).replace(/(_[a-z]+?)/g, v => `${v.slice(-1).toUpperCase()}`);
        let value = data[k];
        if (value instanceof Date) {
          value = moment(value).format('YYYY-MM-DD HH:mm:ss');
        }
        o[na] = value;
      });
      return o;
    }
    return '';
  };
}

module.exports = BaseService;

const mysql = require('mysql');
const { pool } = require('../mysql');
const util = require('./util');

/** 
 * BaseDao 
 * @description 针对mysql封装的基础的增删改查操作已经一些常用的对象
*/
function BaseDao() {
  // this.pool = pool;
  this.mysqlTableName = ' test ';

  // SQL 语句拼接字
  this.AND = ' AND ';
  this.AS = ' AS ';
  this.ASC = ' ASC ';
  this.DELTET = ' DELETE ';
  this.DESC = ' DESC ';
  this.DOT = ' , ';
  this.DOUBLE_QUESTION = ' ?? ';
  this.EQUAL = ' = ';
  this.FROM = ' FROM ';
  this.INSERT = ' INSERT ';
  this.INTO = ' INTO ';
  this.ORDER_BY = ' ORDER BY ';
  this.QUESTION = ' ? ';
  this.SELECT = ' SELECT ';
  this.SET = ' SET ';
  this.STAR = ' * ';
  this.UPDATE = ' UPDATE ';
  this.VALUES = ' VALUES ';
  this.WHERE = ' WHERE ';
  this.CONDITION = this.DOUBLE_QUESTION + this.EQUAL + this.QUESTION;

  
  // SQL 查询错误信息
  BaseDao.prototype.NULL_CONDITON = 600; // 查询条件为空
  BaseDao.prototype.SQL_ERROR = 601; // sql 语句错误
  BaseDao.prototype.PRRAMS_ERROR = 602; // 方法参数有误
  BaseDao.prototype.PRRAMS_TYPE_ERROR = 603; // 方法参数类型有误
  BaseDao.prototype.PRRAMS_NULL = 604; // 方法参数为空对象

  /** 
    * 数据库连接池对象
    */
  BaseDao.prototype.pool = pool;

  /**
   * 执行数据库连接池查询
   * @param {String} sql 
   * @param {Promise CallBack Function} resolve 
   * @param {Promise CallBack Function} reject
   */
  BaseDao.prototype.poolQuery = (sql, resolve, reject) => pool.query(sql, (err, result) => {
    if (err) reject(err);
    else if (result) resolve(result);
  }); 

  /** 
    * 查询语句
    * @param { Object } condition 查询条件对象。键值对
    * @param { Array } queryCondition 需要查询的字段
    * */
  BaseDao.prototype.query = (condition, queryCondition) => {
    const queryPromise = new Promise((resolve, reject) => {
      const sql = this.spliceQuerySql(condition, queryCondition);
      // 查询
      this.poolQuery(sql, resolve, reject);
    });
    return queryPromise;
  };

  /** 
    * 排序查询语句
    * @param { Object } condition 查询条件对象。键值对
    * @param { Array } queryCondition 需要查询的字段
    * @param {String} by 排序的字段
    * @param {String} desc 排序方式||正序和降序
    * */
  BaseDao.prototype.queryAndOrderBY = (condition, queryCondition, by, desc) => {
    if (!by) return this.query(condition, queryCondition);
    let sql = this.spliceQuerySql(condition, queryCondition);
    sql += this.ORDER_BY + util.underscoreName(by);
    if (desc && desc.toUpperCase === this.ASC) sql += this.ASC;
    else sql += this.DESC;

    return new Promise((resolve, reject) => {
      // 查询
      this.poolQuery(sql, resolve, reject);
    });
  };

  /**
   * 新增语句
   * @param { Object } condition 查询条件对象。键值对
   * 
   */
  BaseDao.prototype.add = (condition) => {
    const addPromise = new Promise((resolve, reject) => {
      const sqlKey = [];
      const sqlValue = [];
      Object.keys(condition).forEach((k) => {
        sqlKey.push(util.underscoreName(k));
        sqlValue.push(condition[k]);
      });

      let sql = `${this.INSERT + this.INTO + this.mysqlTableName} (${this.DOUBLE_QUESTION})${this.VALUES}(${this.QUESTION})`;
      sql = mysql.format(sql, [sqlKey, sqlValue]);
      // 查询
      this.poolQuery(sql, resolve, reject);
    });
    return addPromise;
  };

  /**
   * 更新数据库字段
   * @param {Ojbect} setValues 设置字段键值对
   * @param {Object} condition 查询条件键值对
   * @description UPDATE project SET `name`= ?, url = ?, update_time = ? WHERE id= ?
   */
  BaseDao.prototype.update = (setValues, condition) => {
    const updatePromise = new Promise((resolve, reject) => {
      if (!setValues) return reject(this.PRRAMS_NULL);
      if (!condition) return reject(this.NULL_CONDITON);
      let sql = this.UPDATE + this.mysqlTableName + this.SET;
      const sqlValue = [];
      Object.keys(setValues).forEach((k) => {
        sqlValue.push(util.underscoreName(k));
        sqlValue.push(setValues[k]);
        sql += this.CONDITION + this.DOT;
      });
      sql = sql.slice(0, sql.lastIndexOf(','));
      sql += this.WHERE;
      Object.keys(condition).forEach((k) => {
        const va = condition[k];
        if (va !== undefined && va !== '' && va !== null) {
          sqlValue.push(util.underscoreName(k));
          sqlValue.push(va);
          sql += this.CONDITION + this.AND;
        }
      });

      sql = sql.slice(0, sql.lastIndexOf(this.AND));
      sql = mysql.format(sql, sqlValue);
      this.poolQuery(sql, resolve, reject);
    });

    return updatePromise;
  };

  /**
   * 删除一条数据
   * @param {Object} condition 删除限定条件键值对
   * @description DELETE FROM project WHERE id = ?
   */
  BaseDao.prototype.delete = (condition) => {
    const deletePromise = new Promise((resolve, reject) => {
      let sql = this.DELTET + this.FROM + this.mysqlTableName + this.WHERE;

      if (!condition) reject(this.NULL_CONDITON);
      const keys = Object.keys(condition);
      if (!keys || !keys.length) reject(this.NULL_CONDITON);
      const sqlValue = [];
      keys.forEach((k) => {
        const va = condition[k];
        if (va !== undefined && va !== '' && va !== null) {
          sqlValue.push(util.underscoreName(k));
          sqlValue.push(va);
          sql += this.CONDITION + this.AND;
        }
      });

      sql = sql.slice(0, sql.lastIndexOf(this.AND));
      sql = mysql.format(sql, sqlValue);
      this.poolQuery(sql, resolve, reject);
    });
    return deletePromise;
  };

  /** ******** 工具函数或者可以复用的函数****************************** */
  BaseDao.prototype.spliceQuerySql = (condition, queryCondition) => {
    let sql = '';
    // 拼接sql头部语句
    if (queryCondition && queryCondition.length) {
      sql = this.SELECT + queryCondition.join(',') + this.FROM + this.mysqlTableName + this.WHERE;
    } else {
      sql = this.SELECT + this.STAR + this.FROM + this.mysqlTableName + this.WHERE;
    }

    // 分离查询条件的key和value并继续拼接sql语句
    const sqlFormaValue = [];
    Object.keys(condition).forEach((k) => {
      const value = condition[k];
      if (!value) return;
      sqlFormaValue.push(util.underscoreName(k));
      sqlFormaValue.push(value);
      sql += this.DOUBLE_QUESTION + this.EQUAL + this.QUESTION + this.AND; // ' ?? = ? and';
    });
    if (!sqlFormaValue.length) sql += ' 1 = 1';
    else sql = sql.slice(0, sql.lastIndexOf(this.AND));
    // 生成sql
    sql = mysql.format(sql, sqlFormaValue);
    return sql;
  };
}

module.exports = BaseDao;

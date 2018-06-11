
import Dao from '../core/Dao';
import Entity from '../core/Entity';
import mysql from 'mysql';
import mysqlConfig from '../configs/mysql';
import { underScoreName } from '../core/utils';

const pool = mysql.createPool(Object.assign(mysqlConfig, {
  connectionLimit: 100,
}));

export default abstract class BaseDao implements Dao {
  constructor(protected mysqlTableName: string) {
  }
  readonly AND = ' AND ';
  readonly AS = ' AS ';
  readonly ASC = ' ASC ';
  readonly DELTET = ' DELETE ';
  readonly DESC = ' DESC ';
  readonly DOT = ' , ';
  readonly DOUBLE_QUESTION = ' ?? ';
  readonly EQUAL = ' = ';
  readonly FROM = ' FROM ';
  readonly INSERT = ' INSERT ';
  readonly INTO = ' INTO ';
  readonly ORDER_BY = ' ORDER BY ';
  readonly QUESTION = ' ? ';
  readonly SELECT = ' SELECT ';
  readonly SET = ' SET ';
  readonly STAR = ' * ';
  readonly UPDATE = ' UPDATE ';
  readonly VALUES = ' VALUES ';
  readonly WHERE = ' WHERE ';
  readonly CONDITION = this.DOUBLE_QUESTION + this.EQUAL + this.QUESTION;

  poolQuery(sql: string, resolve: PromiseResolve, reject: PromiseReject) {
    pool.query(sql, (error: any, result: any) => {
      if (error) reject(error);
      else if (result) resolve(result);
    });
  }

  query(condition: Entity, queryCondition: string[]): Promise<any> {
    const queryPromise = new Promise<any>((resolve, reject) => {
      const sql = this.spliceQuerySql(condition, queryCondition);
      // 查询
      this.poolQuery(sql, resolve, reject);
    });
    return queryPromise;
  }

  /** ******** 工具函数或者可以复用的函数****************************** */

  spliceQuerySql(condition: Entity, queryCondition: string[]): string {
    let sql = '';
    // 拼接sql头部语句
    if (queryCondition && queryCondition.length) {
      sql = this.SET + queryCondition.join(',') + this.FROM + this.mysqlTableName + this.WHERE;
    } else {
      sql = this.SELECT + this.STAR + this.FROM + this.mysqlTableName + this.WHERE;
    }

    // 分离查询条件的key和value并继续拼接sql语句
    const sqlFormaValue: string[] = [];
    Object.keys(condition).forEach((k) => {
      const value = condition[k];
      if (!value) return;
      sqlFormaValue.push(underScoreName(k));
      sqlFormaValue.push(value);
      sql += this.DOUBLE_QUESTION + this.EQUAL + this.QUESTION + this.AND; // ' ?? = ? and';
    });

    if (!sqlFormaValue.length) sql += ' 1 = 1';
    else sql = sql.slice(0, sql.lastIndexOf(this.AND));
    // 生成sql
    sql = mysql.format(sql, sqlFormaValue);
    return sql;
  }

}
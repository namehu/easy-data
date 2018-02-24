const BaseDao = require('./BaseDao');

/** 
 * 项目DAO
*/
function ProjectDao() {
  BaseDao.call(this);

  this.mysqlTableName = 'project';
}

ProjectDao.prototype = new BaseDao();
ProjectDao.prototype.constructor = ProjectDao;


module.exports = ProjectDao;

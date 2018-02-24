const moment = require('moment');
const BaseService = require('./BaseService');
const ProjectDao = require('../dao/ProjectDao');
const ProjectMap = require('../characterMap/ProjectMap');
const util = require('./util');

const projectDao = new ProjectDao();

/** 
 * ProjectService
 * @description 项目的service对象
 * @version 1.0.0
 * @name Frank.hu
*/
function ProjectService() { 
  BaseService.call(this); 

  /**
   * 查询方法
   * @override 覆写
   * @param {Object} projectMap 
   */
  ProjectService.prototype.query = (projectMap) => {
    projectMap.status = 1;
    return projectDao.queryAndOrderBY(projectMap, null, 'updateTime', 'asc').then((result) => {
      const data = this.convertSqlToJs(result);
      return { data };
    }).catch(() => ({
      code: 500,
      message: 'Query Datebase Occured Problem',
    }));
  };

  /**
   * 
   * @param {String} name 项目名称 
   * @param {*} cb 
   */
  ProjectService.prototype.projectIsExist = (name) => {
    const projectMap = new ProjectMap();
    projectMap.name = name;
    projectMap.status = 1;
    const isExistPromise = new Promise((resolve) => {
      this.query(projectMap).then((result) => {
        if (result.data && result.data.length) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(() => { util.daoErrorHandler(false); });
    });
    return isExistPromise;
  };

  /**
     * 添加
     * @override
     * @param {Object} projectMap 
     */
  ProjectService.prototype.add = (projectMap) => {
    const addPromise = new Promise((resolve) => {
      projectMap.status = 1;
      this.projectIsExist(projectMap.name).then((result) => {
        if (result instanceof Object) resolve({ data: 'Query Project Info Occured Problem' });
        else if (result) resolve({ message: '项目已经存在' });
        else {
          projectMap.createTime = new Date();
          projectMap.updateTime = new Date();
          delete projectMap.id;
          projectDao.add(projectMap).then((res) => {
            projectMap = this.convertSqlToJs(projectMap);
            projectMap.id = res.insertId;
            resolve({
              data: projectMap,
            });
          }).catch(() => {
            resolve({
              code: 500,
              message: 'Query Datebase Occured Problem',
            });
          });
        }
      });
    });
    return addPromise;
  };

  /**
   * 更新项目信息
   * @param {ProjectMap} projectMap 
   */
  ProjectService.prototype.update = (projectMap) => {
    projectMap.status = 1;

    // 查询是否该项目
    const queryPromise = projectDao.query({
      id: projectMap.id,
    }).catch(error => util.daoErrorHandler(error));
  
    let queryByNamePromise = Promise.resolve();
    if (projectMap.name) {
      queryByNamePromise = projectDao.query({
        name: projectMap.name,
      });
    }

    return Promise.all([queryPromise, queryByNamePromise]).then(([r1, r2]) => {
      if (r1 && r2) {
        if (r1.length && r2.length && r1[0].id !== r2[0].id) {
          return { // 项目名称冲突
            message: '项目名称已经存在不能修改',
          };
        } 
        // projectMap = Object.assign({}, projectMap, res[0][0]);
        projectMap.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');

        const condition = {};
        const setValues = {};
        if (projectMap.id) {
          condition.id = projectMap.id;
          delete projectMap.id;
        }
        Object.keys(projectMap).forEach((k) => {
          const va = projectMap[k];
          if (va) {
            setValues[k] = va;
          }
        });

        return projectDao.update(setValues, condition).then(() => {
          projectMap.id = condition.id;
          projectMap.message = 'success';
          return { data: projectMap };
        }).catch(error => util.daoErrorHandler(error));
      }  // 如果不存在的话。执行插入操作
      delete projectMap.id;
      projectMap.createTime = new Date();
      projectMap.updateTime = new Date();
      return projectDao.add(projectMap).then((resu) => {
        projectMap.id = resu.insertId;
        return {
          data: projectMap,
        };
      }).catch(error => util.daoErrorHandler(error));
    }).catch(error => util.daoErrorHandler(error));
  };

  ProjectService.prototype.remove = id => this.delete({
    id,
  }).then(() => ({ message: 'success' }))
  .catch(error => util.daoErrorHandler(error));
}

ProjectService.prototype = new BaseService();
ProjectService.prototype.constructor = ProjectService;

module.exports = new ProjectService();

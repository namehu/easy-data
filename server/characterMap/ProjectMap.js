const CommonMap = require('./commonMap');

/** 
 * 项目映射字段
*/
function ProjectMap() {
  // id
  this.id = '';
  // 项目名称
  this.name = '';
  // 项目url路径
  this.url = '';
  // http协议
  this.protocol = '';
  // 项目状态
  this.status = '';
  // 继承属性
  CommonMap.call(this);
}
module.exports = ProjectMap;

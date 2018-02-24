// sql语句
const sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, name, age) values (0, ?, ?)',
  },
  // 项目
  project: {
    add: 'INSERT INTO project (name, url, create_time, update_time) VALUES (?, ?, ?, ?)',
    get: 'SELECT * FROM project WHERE status = 1',
    queryByName: 'SELECT count(*) FROM project WHERE name = ? and status = 1',
    update: 'UPDATE project SET `name`= ?, url = ?, update_time = ? WHERE id= ?',
    delete: 'DELETE FROM project WHERE id = ?', // 物理删除
    remove: 'UPDATE project SET status = 2 WHERE id = ?', // 逻辑删除
  },
};

module.exports = sqlMap;

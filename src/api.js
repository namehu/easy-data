import axios from 'axios';

/** ***** 项目接口 ****** */
 // 新增
export const addProject = ({ name, url, protocol }) => axios.post('api/project/add', { name, url, protocol });
// 查询
export const getProject = () => axios.get('api/project/query');
// 根据名称查询
export const getProjectByName = name => axios.get('/api/project/query', {
  params: {
    name,
  },
});
// 更新
export const updateProject = ({ id, name, url, protocol }) => axios.post('api/project/update', { id, name, url, protocol });

import ProjectEntity from "../entitys/ProjectEntity";
import ProjectDao from '../daos/ProjectDao';
import { convertSqlResultToEntity } from "./UntilsService";

const projectDao = new ProjectDao();

export default class ProjectService {

  query(params: ProjectEntity) {
    return projectDao.query(params, []).then((result) => {
      const data = convertSqlResultToEntity(result);
      return { data };
    }).catch(() => ({
      code: 500,
      message: 'Query Datebase Occured Problem',
    }));
  }
}
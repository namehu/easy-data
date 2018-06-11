// import BaseEntity from "./BaseEntity";

class ProjectEntity {
  // id
  public id: number;
  // 项目名称
  public name: string;
  // 项目url路径
  public url: string;
  // http协议
  public protocol: string;
  // 项目状态
  public status: number = 1;

}

export default ProjectEntity;
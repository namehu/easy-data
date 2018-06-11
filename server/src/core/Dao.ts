export default interface Dao {
  query(condition: Entity, queryCondition: string[]): Promise<any>;
}
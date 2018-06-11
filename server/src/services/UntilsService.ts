import moment from 'moment';

type d = Entity | any[];
export function convertSqlResultToEntity(data: d): any {
  if (data instanceof Array) {
    return data.map(v => convertSqlResultToEntity(v));
  } else {
    const o: Entity = {};
    Object.keys(data).forEach((k) => {
      const na = String(k).replace(/(_[a-z]+?)/g, v => `${v.slice(-1).toUpperCase()}`);
      let value = data[k];
      if (value instanceof Date) {
        value = moment(value).format('YYYY-MM-DD HH:mm:ss');
      }
      o[na] = value;
    });
    return o;
  }
}
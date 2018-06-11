
declare interface CoreMap {
  create_time: Date;
  update_time: Date;
}

declare interface Entity {
  [propName: string]: any;
}

/** */
declare interface PromiseResolve {
  (value: any): void;
}

declare interface PromiseReject {
  (reson?: any): void;
}
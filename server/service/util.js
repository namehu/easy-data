
/**
 * dao层Sql出错处理函数
 * @param {error} error 
 */
exports.daoErrorHandler = (error) => {
  const data = {
    code: 500,
  };
  
  if (error instanceof Number) {
    switch (error) {
      case 600:
        data.message = 'SQL 查询条件为空';
        break;
      case 601:
        data.message = 'SQL 语句有错';
        break;
      case 602:
        data.message = 'SQL 查询方法参数有误';
        break;
      case 603:
        data.message = 'SQL 处理方法参数类型有误';
        break;
      case 604:
        data.message = 'SQL 查询参数有误';
        break;
      default:
        data.message = 'SQL 查询出错';
    }
  } else {
    data.message = '喵了个咪， SQL 查询出错了。请联系写代码的处理下吧...';
  }

  return data;
};

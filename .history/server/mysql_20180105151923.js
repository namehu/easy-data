const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(Object.assign(config.mysql, {
  connectionLimit: 10,
}));

// connection.connect(function error(err) {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//     return;
//   }
//   console.log(`connected as id  ${connection.threadId}`);
// });

module.exports = pool;

const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config.mysql);

connection.connect(function error(err) {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id  ${connection.threadId}`);
});

module.exports = connection;

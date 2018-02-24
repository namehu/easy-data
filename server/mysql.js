const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(Object.assign(config.mysql, {
  connectionLimit: 100,
}));

exports.pool = pool;

// module.exports = pool;

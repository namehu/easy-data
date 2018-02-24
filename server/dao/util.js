// const mysql = require('mysql');

// function isUpperCase(chart) { return /[A-Z]/.test(chart); }

exports.underscoreName = (name) => {
  // createTime => create_time
  // let stringBuilder = '';
  // if (!name) return '';
  // const n = String(name).split('');
  // n.forEach((v) => {
  //   if (isUpperCase(v)) stringBuilder += `_${v.toLowerCase()}`;
  //   else stringBuilder += v;
  // });
  const na = String(name).replace(/([A-Z]+)/g, v => `_${v.toLowerCase()}`);
  return na;
};

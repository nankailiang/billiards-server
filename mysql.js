/* eslint-disable no-undef */
const mysql = require("mysql");
exports.base = (sql, data, callback) => {
  //创建数据库连接
  connection = mysql.createConnection({
    host: "localhost", //IP地址
    user: "root", //数据库账号
    password: "123456", //数据库密码
    database: "billiards", //数据库名称
    timezone: "08:00"
  });
  //执行数据库操作
  connection.connect();
  //操作数据库（操作数据库是异步的）
  connection.query(sql, data, function(error, results) {
    if(error!=null){
      console.log(error);
    }
    try {
      callback(results);
    } catch (error) {
      console.log(error);
    }
  });
  //关闭数据库
  connection.end();
};

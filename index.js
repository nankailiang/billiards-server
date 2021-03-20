//引进expres框架
const express = require("express");
var router = require("./router");
const bodyParser = require("body-parser");

//创建web服务器
const app = express();

app.use(bodyParser.json());
app.use(require("cors")());

//静态资源访问服务功能
// app.use(express.static(path.join(__dirname, "public")));

app.use(router);

//监听端口
app.listen(3000, () => {
  //控制台输出提示
  console.log("服务器启动成功,端口3000");
});

/*
    router.js:路由模块
*/
const service = require("./service");
var express = require("express");
var router = express.Router();

//登录验证
router.post("/login", service.checkUser);

//获取用户信息
router.post("/info", service.getUserInfo);

//获取所有的用户信息
router.post("/user", service.getUser);

//添加用户
router.post("/addUser", service.addUser);

//删除用户
router.post("/deleteUser", service.deleteUser);

//批量删除用户
router.post("/batchDeleteUser", service.batchDeleteUser);

//编辑用户信息
router.post("/editUser", service.editUser);

//改变用户状态
router.post("/changeState", service.changeState);

//获取所有的会员信息
router.post("/member", service.getMember);

//添加会员
router.post("/addMember", service.addMember);

//删除会员
router.post("/deleteMember", service.deleteMember);

//批量删除会员
router.post("/batchDeleteMember", service.batchDeleteMember);

//编辑会员信息
router.post("/editMember", service.editMember);

//会员充值
router.post("/memberRecharge", service.memberRecharge);

//生成充值记录
router.post("/setRecharge", service.setRecharge);

//查询分区信息
router.post("/zone", service.getZone)

//查询球桌信息
router.post("/table", service.getTable);

//添加一个球桌
router.post("/addTable", service.addTable);

//删除一个球桌
router.post("/deleteTable", service.deleteTable);

//球桌开始计时
router.post("/start", service.startTable);

//球桌结束计时
router.post("/stop", service.stopTable);

//生成会员用户扣费
router.post("/memberConsume", service.memberConsume);

//生成消费记录
router.post("/setConsume", service.setConsume);

//查询所有消费记录
router.post("/consume", service.getConsume);

//删除单条消费记录
router.post("/deleteConsume", service.deleteConsume);

//删除多条消费记录
router.post("/batchDeleteConsume", service.batchDeleteConsume);

//查询所有充值记录
router.post("/recharge", service.getRecharge);

//删除单条充值记录
router.post("/deleteRecharge", service.deleteRecharge);

//删除多条充值记录
router.post("/batchDeleteRecharge", service.batchDeleteRecharge);

//获取近半年每个月的营业额
router.post("/turnover", service.getTurnover);

//获取每个球桌使用的总时长
router.post("/duration", service.getDuration);

//获取近半年每个月办理会员的人数
router.post("/addmun", service.getAddmun);

//获取近半年每个月会员充值总和
router.post("/inmoney", service.getInmoney);

module.exports = router;

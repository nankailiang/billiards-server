/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : billiards

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 31/07/2021 14:55:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for consume
-- ----------------------------
DROP TABLE IF EXISTS `consume`;
CREATE TABLE `consume`  (
  `consume_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '消费编号',
  `member_id` int(10) NOT NULL COMMENT '会员卡号',
  `consume_money` decimal(10, 0) NULL DEFAULT NULL COMMENT '消费金额',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `stop_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `keep_time` int(4) NULL DEFAULT NULL COMMENT '时长',
  `table_id` int(10) NOT NULL COMMENT '所在区域',
  `zone_id` int(10) NOT NULL COMMENT '所在球桌',
  PRIMARY KEY (`consume_id`) USING BTREE,
  INDEX `fk_table_id`(`table_id`) USING BTREE,
  INDEX `fk_czone_id`(`zone_id`) USING BTREE,
  INDEX `fk_cmember_id`(`member_id`) USING BTREE,
  CONSTRAINT `fk_cmember_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_czone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_table_id` FOREIGN KEY (`table_id`) REFERENCES `pool_table` (`table_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 79 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `member_id` int(10) NOT NULL COMMENT '会员卡号',
  `member_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '会员名字',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `balance` decimal(10, 0) NULL DEFAULT NULL COMMENT '卡上余额',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '办理会员时间',
  PRIMARY KEY (`member_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pool_table
-- ----------------------------
DROP TABLE IF EXISTS `pool_table`;
CREATE TABLE `pool_table`  (
  `table_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '球桌编号',
  `zone_id` int(10) NOT NULL COMMENT '分区编号',
  `state` int(2) NOT NULL COMMENT '球桌状态，0为空闲，1为忙',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '持久化球桌开始时间',
  PRIMARY KEY (`table_id`) USING BTREE,
  INDEX `fk_pzone_id`(`zone_id`) USING BTREE,
  CONSTRAINT `fk_pzone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for power
-- ----------------------------
DROP TABLE IF EXISTS `power`;
CREATE TABLE `power`  (
  `power_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `path` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由path',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '路由name',
  `component` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '路由component',
  `index` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '侧边栏index',
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '侧边栏title',
  `className` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '侧边栏小图标',
  PRIMARY KEY (`power_id`) USING BTREE,
  INDEX `fk_up_user_id`(`path`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for recharge
-- ----------------------------
DROP TABLE IF EXISTS `recharge`;
CREATE TABLE `recharge`  (
  `recharge_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '充值编号',
  `member_id` int(10) NOT NULL COMMENT '会员卡号',
  `recharge_money` decimal(10, 0) NULL DEFAULT NULL COMMENT '充值金额',
  `recharge_time` datetime(0) NULL DEFAULT NULL COMMENT '充值时间',
  PRIMARY KEY (`recharge_id`) USING BTREE,
  INDEX `fk_rmember_id`(`member_id`) USING BTREE,
  CONSTRAINT `fk_rmember_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号',
  `user_password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `user_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户电话',
  `user_state` int(4) NOT NULL COMMENT '1为超级管理员，0为普通用户',
  `user_call` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zone
-- ----------------------------
DROP TABLE IF EXISTS `zone`;
CREATE TABLE `zone`  (
  `zone_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '区域编号',
  `zone_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '区域名称',
  `zone_money` decimal(10, 0) NULL DEFAULT NULL COMMENT '区域价格',
  `member_money` decimal(10, 0) NULL DEFAULT NULL COMMENT '会员价格',
  PRIMARY KEY (`zone_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

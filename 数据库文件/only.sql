-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.53 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5220
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 only.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` char(10) NOT NULL COMMENT '管理员账号',
  `password` char(32) NOT NULL COMMENT '管理员密码',
  `loginnum` int(11) NOT NULL COMMENT '登陆次数',
  `lastlogin` datetime NOT NULL COMMENT '最后一次登录时间',
  `ip` char(15) NOT NULL COMMENT '记录登登录的ip',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='管理员信息表';

-- 正在导出表  only.admin 的数据：2 rows
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`aid`, `account`, `password`, `loginnum`, `lastlogin`, `ip`, `status`) VALUES
	(1, '屈向', 'f379eaf3c831b04de153469d1bec345e', 41, '2018-08-09 10:44:38', '::ffff:192.168.', 0),
	(2, '高文静', 'f379eaf3c831b04de153469d1bec345e', 5, '2018-08-08 08:50:47', '::ffff:192.168.', 0);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 导出  表 only.serverclass 结构
CREATE TABLE IF NOT EXISTS `serverclass` (
  `sid` int(15) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sclass` char(50) NOT NULL COMMENT '服务人员类型',
  `headpic` char(50) NOT NULL COMMENT '头像',
  `sname` char(50) NOT NULL COMMENT '服务人员名称',
  `spassword` char(50) NOT NULL COMMENT '密码',
  `zongshi` text COMMENT '服务宗旨',
  `tel` char(11) NOT NULL COMMENT '手机号',
  `email` char(50) NOT NULL COMMENT '邮箱',
  `regtimes` datetime NOT NULL COMMENT '注册时间',
  `ip` char(15) NOT NULL COMMENT 'ip',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='服务人员注册信息表';

-- 正在导出表  only.serverclass 的数据：19 rows
/*!40000 ALTER TABLE `serverclass` DISABLE KEYS */;
INSERT INTO `serverclass` (`sid`, `sclass`, `headpic`, `sname`, `spassword`, `zongshi`, `tel`, `email`, `regtimes`, `ip`, `status`) VALUES
	(2, '主持人', '', '滴滴滴滴滴', 'f379eaf3c831b04de153469d1bec345e', '祝福新人白头到老，百年好合', '15802986448', '12983431718@qq.com', '2018-08-07 11:07:52', '::1', 0),
	(3, '化妆师', '', 'cathy', 'f379eaf3c831b04de153469d1bec345e', '把新娘打扮的漂漂亮亮出嫁啦啦啦', '15802986448', '1293431718@qq.com', '2018-08-07 14:55:18', '::ffff:192.168.', 0),
	(4, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(5, '婚宴酒楼', '', '华清远见', 'e10adc3949ba59abbe56e057f20f883e', '这个人很懒，没有服务宗旨', '15802986448', '1293431718@qq.com', '2018-08-08 00:53:13', '::ffff:192.168.', 0),
	(6, '婚宴酒楼', '', '华清远见', 'e10adc3949ba59abbe56e057f20f883e', '这个人很懒，没有服务宗旨', '15802986448', '1293431718@qq.com', '2018-08-08 00:53:13', '::ffff:192.168.', 0),
	(7, '婚宴酒楼', '', '华清远见', 'e10adc3949ba59abbe56e057f20f883e', '这个人很懒，没有服务宗旨', '15802986448', '1293431718@qq.com', '2018-08-08 00:53:13', '::ffff:192.168.', 0),
	(8, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(9, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(10, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(11, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(12, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(13, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(14, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(15, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(16, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(17, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(18, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(19, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0),
	(20, '摄影师', '', '屈向', 'f379eaf3c831b04de153469d1bec345e', '拍最好看的照片，留住最美的瞬间', '15802986448', '1293431718@qq.com', '2018-08-07 15:05:49', '::ffff:192.168.', 0);
/*!40000 ALTER TABLE `serverclass` ENABLE KEYS */;

-- 导出  表 only.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` char(50) NOT NULL COMMENT '账号',
  `password` char(50) NOT NULL COMMENT 'md5加密的密码',
  `tel` char(50) NOT NULL COMMENT '手机号',
  `email` char(50) NOT NULL COMMENT '邮箱',
  `header` char(50) NOT NULL COMMENT '头像',
  `sign` text COMMENT '个性签名',
  `loginnum` int(11) NOT NULL COMMENT '登录次数',
  `ip` char(15) NOT NULL COMMENT '用户ip',
  `lasttime` datetime NOT NULL COMMENT '最后一次登录时间',
  `regtime` datetime NOT NULL COMMENT '注册时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户状态0',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='普通用户注册信息表';

-- 正在导出表  only.user 的数据：4 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `username`, `password`, `tel`, `email`, `header`, `sign`, `loginnum`, `ip`, `lasttime`, `regtime`, `status`) VALUES
	(1, '哈哈哈哈', 'f379eaf3c831b04de153469d1bec345e', '15802986448', '1293431718@qq.com', '', '我是哈哈哈', 0, '::1', '0000-00-00 00:00:00', '2018-08-07 10:12:48', 0),
	(2, '高文静哈哈哈', 'f379eaf3c831b04de153469d1bec345e', '19999999997', '1293431718@qq.com', '', '我是高老师', 0, '::1', '0000-00-00 00:00:00', '2018-08-07 10:13:52', 0),
	(3, '刘嘉欣', 'f379eaf3c831b04de153469d1bec345e', '15235656565', '1293431718@qq.com', '', '我是刘嘉欣', 0, '::1', '0000-00-00 00:00:00', '2018-08-07 12:22:38', 0),
	(4, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(5, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(6, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(7, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(8, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(9, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(10, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(11, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(12, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(13, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(14, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(15, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(16, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(17, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(18, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(19, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(20, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(21, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(22, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(23, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(24, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(25, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(26, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0),
	(27, '屈向', '89a9b4c969d2ad6a5a16f49a46cd2766', '15908926556', '1293431718@qq.com', '', '我是最帅的', 0, '::ffff:192.168.', '0000-00-00 00:00:00', '2018-08-07 14:09:52', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 导出  表 only.win 结构
CREATE TABLE IF NOT EXISTS `win` (
  `wid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` char(25) DEFAULT NULL COMMENT '用户名称',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `sign` text NOT NULL COMMENT '用户个性签名',
  `name1` char(50) NOT NULL COMMENT '主持人名称',
  `name2` char(50) NOT NULL COMMENT '采用的摄影师',
  `name3` char(50) NOT NULL COMMENT '婚宴酒楼',
  `name4` char(50) NOT NULL COMMENT '采用的策划',
  `name5` char(50) NOT NULL COMMENT '采用的跟妆',
  `wintime` datetime NOT NULL COMMENT '成功时间',
  `wedword` text NOT NULL COMMENT '婚礼宣言',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`wid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='成功案列表';

-- 正在导出表  only.win 的数据：0 rows
/*!40000 ALTER TABLE `win` DISABLE KEYS */;
/*!40000 ALTER TABLE `win` ENABLE KEYS */;

-- 导出  表 only.xinyuandan 结构
CREATE TABLE IF NOT EXISTS `xinyuandan` (
  `xid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `sid` int(11) NOT NULL COMMENT '用户选择的服务人员的id',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态0正常',
  PRIMARY KEY (`xid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户的心愿单';

-- 正在导出表  only.xinyuandan 的数据：2 rows
/*!40000 ALTER TABLE `xinyuandan` DISABLE KEYS */;
INSERT INTO `xinyuandan` (`xid`, `uid`, `sid`, `status`) VALUES
	(1, 3, 3, 0),
	(2, 3, 3, 0);
/*!40000 ALTER TABLE `xinyuandan` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

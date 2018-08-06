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
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='管理员信息表';

-- 正在导出表  only.admin 的数据：0 rows
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`aid`, `account`, `password`, `loginnum`, `lastlogin`, `ip`) VALUES
	(1, '屈向', 'f379eaf3c831b04de153469d1bec345e', 0, '0000-00-00 00:00:00', ''),
	(2, '高文静', 'f379eaf3c831b04de153469d1bec345e', 0, '0000-00-00 00:00:00', '');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 导出  表 only.serverclass 结构
CREATE TABLE IF NOT EXISTS `serverclass` (
  `sid` int(15) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sclass` char(50) NOT NULL COMMENT '服务人员类型',
  `headpic` char(50) NOT NULL COMMENT '头像',
  `sname` char(50) NOT NULL COMMENT '服务人员名称',
  `zongshi` text COMMENT '服务宗旨',
  `tel` char(11) NOT NULL COMMENT '手机号',
  `email` char(50) NOT NULL COMMENT '邮箱',
  `regtimes` datetime NOT NULL COMMENT '注册时间',
  `ip` char(15) NOT NULL COMMENT 'ip',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='服务人员注册信息表';

-- 正在导出表  only.serverclass 的数据：0 rows
/*!40000 ALTER TABLE `serverclass` DISABLE KEYS */;
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='普通用户注册信息表';

-- 正在导出表  only.user 的数据：0 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
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

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

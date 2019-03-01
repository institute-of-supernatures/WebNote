

DROP TABLE IF EXISTS `chat_user`;
CREATE TABLE `chat_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `userPass` varchar(255) NOT NULL DEFAULT '' COMMENT '用户密码',
  `userIcon` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='聊天用户';

#
# Data for table "chat_user"
#

/*!40000 ALTER TABLE `chat_user` DISABLE KEYS */;
INSERT INTO `chat_user` VALUES (1,'rose','123456','暗黑修女梅丽莎_icon.png'),(2,'jack','123456','八神庵_icon.png');
/*!40000 ALTER TABLE `chat_user` ENABLE KEYS */;

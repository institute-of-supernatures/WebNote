

DROP TABLE IF EXISTS `chat_message`;
CREATE TABLE `chat_message` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '聊天内容',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='聊天信息';

#
# Data for table "chat_message"
#

/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (1,1,'你跳我就跳'),(2,2,'亲爱的，相信我，你跳了我也会跳的'),(3,1,'如果你不跳怎么办'),(4,2,'怎么可能'),(5,1,'那我跳了啊'),(6,2,'嗯呢，爱你哟'),(7,1,'水里面好冷啊'),(8,2,'叫你多穿一点');
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;

-- Active: 1650891592667@@127.0.0.1@3306@portfolio
DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) UNIQUE,
  `email` varchar(50) UNIQUE,
  `password` varchar(400) UNIQUE,
  `name` varchar(45) DEFAULT NULL,
  `coverPic` varchar(400) DEFAULT NULL,
  `profilePic` varchar(400) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

DROP TABLE IF EXISTS post;

CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL,
  `img` varchar(400) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS comment;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(250) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `postId_idx` (`postId`),
  KEY `commentUserId_idx` (`userId`,`postId`),
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `post` (`id`)
);

DROP TABLE IF EXISTS likes;

CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
 UNIQUE KEY `like_user_post_unique` (`userId`, `postId`),
  KEY `likeUserId_idx` (`userId`),
  KEY `likePostId_idx` (`postId`),
  CONSTRAINT `like_PostId` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `like_UserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS relationship;

CREATE TABLE `relationship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int NOT NULL,
  `followedUserId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `followerUser_idx` (`followerUserId`),
  KEY `followedUser_idx` (`followedUserId`),
  CONSTRAINT `followedUser` FOREIGN KEY (`followedUserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followerUser` FOREIGN KEY (`followerUserId`) REFERENCES `user` (`id`)
);

DROP TABLE IF EXISTS storie;

CREATE TABLE `storie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(400) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `storyUserId_idx` (`userId`),
  CONSTRAINT `storyUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO
    user (username, email, password, name, coverPic, profilePic, city, website)
VALUES (
        "test",
        "test@gmail.com",
        "$2b$10$ITenFoyFKIk5gF/Gpz5lbOFe0Naw2PrCT56yFASSwqtSfdRB.tMoS",
        "Teston",
        "https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "Boston",
        "testo.com"
    );

INSERT INTO post (`desc`, img, userId, `createdAt`) VALUES (
  "jolies vacances,joli poney",
    "https://images.pexels.com/photos/16574814/pexels-photo-16574814/free-photo-of-rhume-neige-hiver-animal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",4,
    "2023-07-18"
);

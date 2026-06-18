CREATE TABLE `friends_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer,
	`friendId` integer,
	CONSTRAINT `fk_friends_table_userId_users_table_id_fk` FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`),
	CONSTRAINT `fk_friends_table_friendId_users_table_id_fk` FOREIGN KEY (`friendId`) REFERENCES `users_table`(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL UNIQUE
);

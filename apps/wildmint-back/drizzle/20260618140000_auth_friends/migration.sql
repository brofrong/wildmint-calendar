DROP TABLE IF EXISTS `friends_table`;
--> statement-breakpoint
DROP TABLE IF EXISTS `users_table`;
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`avatar` text,
	`token` text NOT NULL UNIQUE,
	`createdAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `friendships` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`friendId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
	FOREIGN KEY (`friendId`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friendships_user_friend_idx` ON `friendships` (`userId`,`friendId`);
--> statement-breakpoint
CREATE TABLE `favorite_events` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`eventId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_events_user_event_idx` ON `favorite_events` (`userId`,`eventId`);

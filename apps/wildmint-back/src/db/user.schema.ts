import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
	id: text().primaryKey(),
	name: text().notNull(),
	avatar: text(),
	token: text().notNull().unique(),
	createdAt: text().notNull(),
});

export const friendshipsTable = sqliteTable(
	"friendships",
	{
		id: text().primaryKey(),
		userId: text()
			.notNull()
			.references(() => usersTable.id),
		friendId: text()
			.notNull()
			.references(() => usersTable.id),
	},
	(table) => [
		uniqueIndex("friendships_user_friend_idx").on(table.userId, table.friendId),
	],
);

export const favoriteEventsTable = sqliteTable(
	"favorite_events",
	{
		id: text().primaryKey(),
		userId: text()
			.notNull()
			.references(() => usersTable.id),
		eventId: text().notNull(),
	},
	(table) => [
		uniqueIndex("favorite_events_user_event_idx").on(
			table.userId,
			table.eventId,
		),
	],
);

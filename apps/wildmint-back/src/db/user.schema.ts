import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const friendsTable = sqliteTable("friends_table", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().references(() => usersTable.id),
  friendId: int().references(() => usersTable.id),
});

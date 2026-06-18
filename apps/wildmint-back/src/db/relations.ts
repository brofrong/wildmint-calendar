import { defineRelations } from "drizzle-orm";
import {
	favoriteEventsTable,
	friendshipsTable,
	usersTable,
} from "./user.schema";

export const relations = defineRelations(
	{ users: usersTable, friendships: friendshipsTable, favoriteEvents: favoriteEventsTable },
	(r) => ({
		users: {
			friendships: r.many.friendships(),
			favoriteEvents: r.many.favoriteEvents(),
		},
		friendships: {
			user: r.one.users({
				from: r.friendships.userId,
				to: r.users.id,
			}),
		},
		favoriteEvents: {
			user: r.one.users({
				from: r.favoriteEvents.userId,
				to: r.users.id,
			}),
		},
	}),
);

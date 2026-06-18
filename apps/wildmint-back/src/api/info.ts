import { count, countDistinct } from "drizzle-orm";
import { db } from "../db/db";
import { favoriteEventsTable, usersTable } from "../db/user.schema";
import { jsonResponse } from "./utils";

export async function getInfoStats() {
	const [usersRow] = await db
		.select({ count: count() })
		.from(usersTable);

	const [usersWithFavoritesRow] = await db
		.select({ count: countDistinct(favoriteEventsTable.userId) })
		.from(favoriteEventsTable);

	const [totalFavoritesRow] = await db
		.select({ count: count() })
		.from(favoriteEventsTable);

	return {
		registeredUsersCount: usersRow?.count ?? 0,
		usersWithFavoritesCount: usersWithFavoritesRow?.count ?? 0,
		totalFavoritesCount: totalFavoritesRow?.count ?? 0,
	};
}

export async function handleInfoRequest(req: Request): Promise<Response | null> {
	const { pathname } = new URL(req.url);

	if (pathname !== "/api/info" || req.method !== "GET") {
		return null;
	}

	return jsonResponse(await getInfoStats());
}

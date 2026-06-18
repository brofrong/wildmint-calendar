import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/db";
import {
	favoriteEventsTable,
	friendshipsTable,
	usersTable,
} from "../db/user.schema";
import { getAuthenticatedUser } from "./auth";
import { jsonError, jsonResponse, readJsonBody } from "./utils";

const addFriendSchema = z.object({
	friendId: z.string().uuid(),
});

async function getFavoriteEventIds(userId: string) {
	const rows = await db
		.select({ eventId: favoriteEventsTable.eventId })
		.from(favoriteEventsTable)
		.where(eq(favoriteEventsTable.userId, userId));

	return rows.map((row) => row.eventId);
}

async function serializeFriend(userId: string) {
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))
		.limit(1);

	if (!user) {
		return null;
	}

	return {
		id: user.id,
		name: user.name,
		avatar: user.avatar,
		favoriteEventIds: await getFavoriteEventIds(user.id),
	};
}

async function createFriendship(userId: string, friendId: string) {
	const existing = await db
		.select()
		.from(friendshipsTable)
		.where(
			and(
				eq(friendshipsTable.userId, userId),
				eq(friendshipsTable.friendId, friendId),
			),
		)
		.limit(1);

	if (existing.length > 0) {
		return;
	}

	await db.insert(friendshipsTable).values({
		id: crypto.randomUUID(),
		userId,
		friendId,
	});
}

export async function getFriendsForUser(userId: string) {
	const rows = await db
		.select({ friendId: friendshipsTable.friendId })
		.from(friendshipsTable)
		.where(eq(friendshipsTable.userId, userId));

	const friends = await Promise.all(
		rows.map((row) => serializeFriend(row.friendId)),
	);

	return friends.filter((friend) => friend !== null);
}

export async function handleFriendsRequest(req: Request): Promise<Response | null> {
	const { pathname } = new URL(req.url);

	if (pathname === "/api/friends" && req.method === "POST") {
		const user = await getAuthenticatedUser(req);
		if (!user) {
			return jsonError("Не авторизован", 401);
		}

		const body = await readJsonBody(req);
		const parsed = addFriendSchema.safeParse(body);
		if (!parsed.success) {
			return jsonError("Некорректный код друга", 400);
		}

		const { friendId } = parsed.data;

		if (friendId === user.id) {
			return jsonError("Нельзя добавить себя в друзья", 400);
		}

		const [friendUser] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, friendId))
			.limit(1);

		if (!friendUser) {
			return jsonError("Пользователь не найден", 404);
		}

		await createFriendship(user.id, friendId);
		await createFriendship(friendId, user.id);

		const friend = await serializeFriend(friendId);
		if (!friend) {
			return jsonError("Пользователь не найден", 404);
		}

		return jsonResponse({ friend });
	}

	const deleteMatch = pathname.match(/^\/api\/friends\/([^/]+)$/);
	if (deleteMatch && req.method === "DELETE") {
		const user = await getAuthenticatedUser(req);
		if (!user) {
			return jsonError("Не авторизован", 401);
		}

		const friendId = deleteMatch[1];

		await db
			.delete(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.userId, user.id),
					eq(friendshipsTable.friendId, friendId),
				),
			);

		await db
			.delete(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.userId, friendId),
					eq(friendshipsTable.friendId, user.id),
				),
			);

		return jsonResponse({ ok: true });
	}

	return null;
}

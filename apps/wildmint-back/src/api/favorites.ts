import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/db";
import { favoriteEventsTable } from "../db/user.schema";
import { getAuthenticatedUser } from "./auth";
import { jsonError, jsonResponse, readJsonBody } from "./utils";

const syncFavoritesSchema = z.object({
	eventIds: z.array(z.string()),
});

export async function handleFavoritesRequest(
	req: Request,
): Promise<Response | null> {
	const { pathname } = new URL(req.url);

	if (pathname === "/api/favorites" && req.method === "PUT") {
		const user = await getAuthenticatedUser(req);
		if (!user) {
			return jsonError("Не авторизован", 401);
		}

		const body = await readJsonBody(req);
		const parsed = syncFavoritesSchema.safeParse(body);
		if (!parsed.success) {
			return jsonError("Некорректные данные", 400);
		}

		const uniqueEventIds = [...new Set(parsed.data.eventIds)];

		await db
			.delete(favoriteEventsTable)
			.where(eq(favoriteEventsTable.userId, user.id));

		if (uniqueEventIds.length > 0) {
			await db.insert(favoriteEventsTable).values(
				uniqueEventIds.map((eventId) => ({
					id: crypto.randomUUID(),
					userId: user.id,
					eventId,
				})),
			);
		}

		return jsonResponse({ ok: true, eventIds: uniqueEventIds });
	}

	return null;
}

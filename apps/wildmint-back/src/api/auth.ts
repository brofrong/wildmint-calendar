import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/db";
import { usersTable } from "../db/user.schema";
import {
	getSessionToken,
	withSessionCookie,
} from "./cookies";
import { jsonError, jsonResponse, readJsonBody } from "./utils";

const signupSchema = z.object({
	name: z.string().trim().min(1).max(100),
	avatar: z.string().nullable().optional(),
});

const updateProfileSchema = z.object({
	name: z.string().trim().min(1).max(100).optional(),
	avatar: z.string().nullable().optional(),
});

function serializeUser(user: typeof usersTable.$inferSelect) {
	return {
		id: user.id,
		name: user.name,
		avatar: user.avatar,
	};
}

export async function getUserByToken(token: string) {
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.token, token))
		.limit(1);

	return user ?? null;
}

export async function getAuthenticatedUser(req: Request) {
	const token = getSessionToken(req);
	if (!token) {
		return null;
	}

	return getUserByToken(token);
}

export async function handleAuthRequest(req: Request): Promise<Response | null> {
	const { pathname } = new URL(req.url);

	if (pathname === "/api/auth/signup" && req.method === "POST") {
		const body = await readJsonBody(req);
		const parsed = signupSchema.safeParse(body);
		if (!parsed.success) {
			return jsonError("Некорректные данные", 400);
		}

		const userId = crypto.randomUUID();
		const token = crypto.randomUUID();

		const [user] = await db
			.insert(usersTable)
			.values({
				id: userId,
				name: parsed.data.name,
				avatar: parsed.data.avatar ?? null,
				token,
				createdAt: new Date().toISOString(),
			})
			.returning();

		console.log(
			`Создан новый пользователь: id=${user.id}, name="${user.name}"`,
		);

		return withSessionCookie(
			jsonResponse({ user: serializeUser(user) }),
			token,
		);
	}

	if (pathname === "/api/auth/me" && req.method === "GET") {
		const user = await getAuthenticatedUser(req);
		if (!user) {
			return jsonError("Не авторизован", 401);
		}

		return jsonResponse({ user: serializeUser(user) });
	}

	if (pathname === "/api/auth/me" && req.method === "PATCH") {
		const user = await getAuthenticatedUser(req);
		if (!user) {
			return jsonError("Не авторизован", 401);
		}

		const body = await readJsonBody(req);
		const parsed = updateProfileSchema.safeParse(body);
		if (!parsed.success) {
			return jsonError("Некорректные данные", 400);
		}

		const updates: Partial<typeof usersTable.$inferInsert> = {};
		if (parsed.data.name !== undefined) {
			updates.name = parsed.data.name;
		}
		if (parsed.data.avatar !== undefined) {
			updates.avatar = parsed.data.avatar;
		}

		if (Object.keys(updates).length === 0) {
			return jsonResponse({ user: serializeUser(user) });
		}

		const [updatedUser] = await db
			.update(usersTable)
			.set(updates)
			.where(eq(usersTable.id, user.id))
			.returning();

		return jsonResponse({ user: serializeUser(updatedUser) });
	}

	return null;
}

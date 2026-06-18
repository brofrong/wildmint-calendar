import { getAuthenticatedUser } from "./auth";
import { getFriendsForUser } from "./friends";
import { jsonError, jsonResponse } from "./utils";

export async function handleSocialRequest(req: Request): Promise<Response | null> {
	const { pathname } = new URL(req.url);

	if (pathname === "/api/social" && req.method === "GET") {
		const user = await getAuthenticatedUser(req);
		if (!user) {
			return jsonError("Не авторизован", 401);
		}

		const friends = await getFriendsForUser(user.id);
		return jsonResponse({ friends });
	}

	return null;
}

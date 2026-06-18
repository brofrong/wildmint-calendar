import { handleAuthRequest } from "./auth";
import { handleFavoritesRequest } from "./favorites";
import { handleFriendsRequest } from "./friends";
import { handleInfoRequest } from "./info";
import { handlePingRequest } from "./ping";
import { handleSocialRequest } from "./social";

const handlers = [
	handlePingRequest,
	handleAuthRequest,
	handleFriendsRequest,
	handleFavoritesRequest,
	handleSocialRequest,
	handleInfoRequest,
];

export async function handleApiRequest(req: Request): Promise<Response | null> {
	for (const handler of handlers) {
		const response = await handler(req);
		if (response) {
			return response;
		}
	}

	return null;
}

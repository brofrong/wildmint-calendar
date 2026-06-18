export const SESSION_COOKIE_NAME = "wildmint_session";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 10;

export function getSessionToken(req: Request): string | null {
	const cookieHeader = req.headers.get("cookie");
	if (!cookieHeader) {
		return null;
	}

	for (const part of cookieHeader.split(";")) {
		const [name, ...valueParts] = part.trim().split("=");
		if (name === SESSION_COOKIE_NAME) {
			return decodeURIComponent(valueParts.join("="));
		}
	}

	return null;
}

export function withSessionCookie(response: Response, token: string): Response {
	const headers = new Headers(response.headers);
	headers.append(
		"Set-Cookie",
		`${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
	);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

export function clearSessionCookie(response: Response): Response {
	const headers = new Headers(response.headers);
	headers.append(
		"Set-Cookie",
		`${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
	);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

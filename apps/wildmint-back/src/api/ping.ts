export function handlePingRequest(req: Request): Response | null {
	const { pathname } = new URL(req.url);

	if (pathname !== "/api/ping" || req.method !== "GET") {
		return null;
	}

	return Response.json({
		ok: true,
		timestamp: new Date().toISOString(),
	});
}

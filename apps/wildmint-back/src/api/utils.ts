export function jsonResponse(data: unknown, status = 200): Response {
	return Response.json(data, { status });
}

export function jsonError(message: string, status: number): Response {
	return Response.json({ error: message }, { status });
}

export async function readJsonBody(req: Request): Promise<unknown> {
	try {
		return await req.json();
	} catch {
		return null;
	}
}

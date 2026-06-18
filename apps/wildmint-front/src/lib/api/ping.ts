const PING_URL = "/api/ping";

export interface PingResponse {
	ok: boolean;
	timestamp: string;
}

export async function pingServer(): Promise<boolean> {
	try {
		const response = await fetch(PING_URL, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			return false;
		}

		const data = (await response.json()) as PingResponse;
		return data.ok === true;
	} catch {
		return false;
	}
}

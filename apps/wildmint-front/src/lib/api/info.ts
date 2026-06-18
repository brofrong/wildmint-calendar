const API_BASE = "/api";

export interface InfoStats {
	registeredUsersCount: number;
	usersWithFavoritesCount: number;
	totalFavoritesCount: number;
}

export async function fetchInfoStats(): Promise<InfoStats> {
	const response = await fetch(`${API_BASE}/info`, {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`Ошибка запроса (${response.status})`);
	}

	return response.json() as Promise<InfoStats>;
}

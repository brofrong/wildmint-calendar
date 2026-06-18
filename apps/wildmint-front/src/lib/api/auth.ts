const API_BASE = "/api";

async function apiFetch<T>(
	path: string,
	options: RequestInit = {},
): Promise<T> {
	const response = await fetch(`${API_BASE}${path}`, {
		credentials: "include",
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!response.ok) {
		const body = (await response.json().catch(() => null)) as {
			error?: string;
		} | null;
		throw new Error(body?.error ?? `Ошибка запроса (${response.status})`);
	}

	return response.json() as Promise<T>;
}

export interface UserProfile {
	id: string;
	name: string;
	avatar: string | null;
}

export async function signup(
	name: string,
	avatar: string | null,
): Promise<UserProfile> {
	const data = await apiFetch<{ user: UserProfile }>("/auth/signup", {
		method: "POST",
		body: JSON.stringify({ name, avatar }),
	});
	return data.user;
}

export type FetchCurrentUserResult =
	| { status: "authenticated"; user: UserProfile }
	| { status: "unauthenticated" }
	| { status: "unknown" };

export async function fetchCurrentUser(): Promise<FetchCurrentUserResult> {
	try {
		const response = await fetch(`${API_BASE}/auth/me`, {
			credentials: "include",
			cache: "no-store",
		});

		if (response.status === 401) {
			return { status: "unauthenticated" };
		}

		if (!response.ok) {
			return { status: "unknown" };
		}

		const data = (await response.json()) as { user: UserProfile };
		return { status: "authenticated", user: data.user };
	} catch {
		return { status: "unknown" };
	}
}

export async function updateProfile(input: {
	name?: string;
	avatar?: string | null;
}): Promise<UserProfile> {
	const data = await apiFetch<{ user: UserProfile }>("/auth/me", {
		method: "PATCH",
		body: JSON.stringify(input),
	});
	return data.user;
}

export interface FriendProfile {
	id: string;
	name: string;
	avatar: string | null;
	favoriteEventIds: string[];
}

export async function fetchSocial(): Promise<FriendProfile[]> {
	const data = await apiFetch<{ friends: FriendProfile[] }>("/social");
	return data.friends;
}

export async function addFriend(friendId: string): Promise<FriendProfile> {
	const data = await apiFetch<{ friend: FriendProfile }>("/friends", {
		method: "POST",
		body: JSON.stringify({ friendId }),
	});
	return data.friend;
}

export async function removeFriend(friendId: string): Promise<void> {
	await apiFetch<{ ok: boolean }>(`/friends/${friendId}`, {
		method: "DELETE",
	});
}

export async function syncFavorites(eventIds: string[]): Promise<void> {
	await apiFetch<{ ok: boolean }>("/favorites", {
		method: "PUT",
		body: JSON.stringify({ eventIds }),
	});
}

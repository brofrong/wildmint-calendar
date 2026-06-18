import { syncFavorites } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth-store";

export async function syncFavoritesToServer(eventIds: string[]) {
	const user = useAuthStore.getState().user;
	if (!user) {
		return;
	}

	try {
		await syncFavorites(eventIds);
	} catch {
		// ignore offline sync errors
	}
}

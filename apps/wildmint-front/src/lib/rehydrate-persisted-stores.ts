import { useAuthStore } from "@/stores/auth-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useSocialStore } from "@/stores/social-store";

export function rehydratePersistedStores() {
	return Promise.all([
		useAuthStore.persist.rehydrate(),
		useSocialStore.persist.rehydrate(),
		useFavoritesStore.persist.rehydrate(),
		useSettingsStore.persist.rehydrate(),
	]);
}

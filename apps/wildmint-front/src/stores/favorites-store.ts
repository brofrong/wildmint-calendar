import { create } from "zustand";
import { persist } from "zustand/middleware";

import { syncFavoritesToServer } from "@/lib/sync-favorites";

interface FavoritesState {
	favoriteEventIds: string[];
	toggleFavorite: (eventId: string) => void;
	setFavoriteEventIds: (eventIds: string[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favoriteEventIds: [],
			toggleFavorite: (eventId) => {
				const nextIds = get().favoriteEventIds.includes(eventId)
					? get().favoriteEventIds.filter((id) => id !== eventId)
					: [...get().favoriteEventIds, eventId];

				set({ favoriteEventIds: nextIds });
				void syncFavoritesToServer(nextIds);
			},
			setFavoriteEventIds: (eventIds) => {
				set({ favoriteEventIds: eventIds });
				void syncFavoritesToServer(eventIds);
			},
		}),
		{
			name: "wildmint-favorites",
			skipHydration: true,
		},
	),
);

export function useIsFavorite(eventId: string): boolean {
	return useFavoritesStore((state) => state.favoriteEventIds.includes(eventId));
}

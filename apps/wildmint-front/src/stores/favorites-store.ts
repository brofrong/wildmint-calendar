import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
	favoriteEventIds: string[];
	toggleFavorite: (eventId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set) => ({
			favoriteEventIds: [],
			toggleFavorite: (eventId) =>
				set((state) => ({
					favoriteEventIds: state.favoriteEventIds.includes(eventId)
						? state.favoriteEventIds.filter((id) => id !== eventId)
						: [...state.favoriteEventIds, eventId],
				})),
		}),
		{
			name: "wildmint-favorites",
		},
	),
);

export function useIsFavorite(eventId: string): boolean {
	return useFavoritesStore((state) => state.favoriteEventIds.includes(eventId));
}

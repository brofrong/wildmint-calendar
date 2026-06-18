import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import type { FriendProfile } from "@/lib/api/auth";

interface SocialState {
	friends: FriendProfile[];
	setFriends: (friends: FriendProfile[]) => void;
	addFriend: (friend: FriendProfile) => void;
	removeFriend: (friendId: string) => void;
}

export const useSocialStore = create<SocialState>()(
	persist(
		(set) => ({
			friends: [],
			setFriends: (friends) => set({ friends }),
			addFriend: (friend) =>
				set((state) => ({
					friends: state.friends.some((item) => item.id === friend.id)
						? state.friends
						: [...state.friends, friend],
				})),
			removeFriend: (friendId) =>
				set((state) => ({
					friends: state.friends.filter((friend) => friend.id !== friendId),
				})),
		}),
		{
			name: "wildmint-social",
			skipHydration: true,
		},
	),
);

export function useFriendsWhoLikeEvent(eventId: string) {
	return useSocialStore(
		useShallow((state) =>
			state.friends.filter((friend) =>
				friend.favoriteEventIds.includes(eventId),
			),
		),
	);
}

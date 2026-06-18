import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserProfile } from "@/lib/api/auth";

interface AuthState {
	user: UserProfile | null;
	isAuthenticated: boolean;
	setUser: (user: UserProfile | null) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			setUser: (user) => set({ user, isAuthenticated: user !== null }),
		}),
		{
			name: "wildmint-auth",
		},
	),
);

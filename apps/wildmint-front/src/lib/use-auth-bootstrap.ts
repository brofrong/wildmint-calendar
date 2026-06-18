import { useEffect } from "react";

import { fetchCurrentUser, fetchSocial } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth-store";
import { useSocialStore } from "@/stores/social-store";

export function useAuthBootstrap() {
	const setUser = useAuthStore((state) => state.setUser);
	const setFriends = useSocialStore((state) => state.setFriends);

	useEffect(() => {
		let cancelled = false;

		async function bootstrap() {
			const result = await fetchCurrentUser();
			if (cancelled) {
				return;
			}

			if (result.status === "authenticated") {
				setUser(result.user);

				try {
					const friends = await fetchSocial();
					if (!cancelled) {
						setFriends(friends);
					}
				} catch {
					// offline — use cached social data from localStorage
				}
				return;
			}

			if (result.status === "unauthenticated") {
				setUser(null);
			}
		}

		void bootstrap();

		return () => {
			cancelled = true;
		};
	}, [setFriends, setUser]);
}

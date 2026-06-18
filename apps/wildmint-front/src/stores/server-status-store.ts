import { create } from "zustand";

import { pingServer } from "@/lib/api/ping";

export type ServerStatus = "checking" | "online" | "offline";

const PING_INTERVAL_MS = 30_000;

interface ServerStatusState {
	status: ServerStatus;
	lastCheckedAt: string | null;
	startPinging: () => () => void;
}

export const useServerStatusStore = create<ServerStatusState>((set) => ({
	status: "checking",
	lastCheckedAt: null,
	startPinging: () => {
		let active = true;
		let intervalId: ReturnType<typeof setInterval> | null = null;

		const check = async () => {
			if (!active) {
				return;
			}

			set({ status: "checking" });

			const isOnline = await pingServer();

			if (!active) {
				return;
			}

			set({
				status: isOnline ? "online" : "offline",
				lastCheckedAt: new Date().toISOString(),
			});
		};

		void check();
		intervalId = setInterval(() => {
			void check();
		}, PING_INTERVAL_MS);

		return () => {
			active = false;
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	},
}));

import { useEffect } from "react";

import { useServerStatusStore } from "@/stores/server-status-store";

export function useServerPing() {
	const startPinging = useServerStatusStore((state) => state.startPinging);

	useEffect(() => startPinging(), [startPinging]);
}

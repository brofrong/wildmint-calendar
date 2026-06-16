import { useEffect, useMemo, useState } from "react";

import { useSettingsStore } from "@/stores/settings-store";

function createMockDate(date: string, time: string): Date {
	return new Date(`${date}T${time}:00`);
}

export function useEffectiveNow(): Date {
	const devMockTimeEnabled = useSettingsStore(
		(state) => state.devMockTimeEnabled,
	);
	const devMockDate = useSettingsStore((state) => state.devMockDate);
	const devMockTime = useSettingsStore((state) => state.devMockTime);
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		const interval = window.setInterval(() => {
			setNow(new Date());
		}, 60_000);

		return () => window.clearInterval(interval);
	}, []);

	return useMemo(() => {
		if (import.meta.env.DEV && devMockTimeEnabled) {
			return createMockDate(devMockDate, devMockTime);
		}

		return now;
	}, [devMockDate, devMockTime, devMockTimeEnabled, now]);
}

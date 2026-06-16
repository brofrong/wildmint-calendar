import { useEffect } from "react";

import { watchTheme } from "@/lib/theme";
import { useSettingsStore } from "@/stores/settings-store";

export function ThemeProvider() {
	const theme = useSettingsStore((state) => state.theme);

	useEffect(() => {
		return watchTheme(theme);
	}, [theme]);

	return null;
}

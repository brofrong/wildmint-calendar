import type { AppTheme } from "@/stores/settings-store";

function resolveTheme(theme: AppTheme): "light" | "dark" {
	if (theme === "auto") {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}

	return theme;
}

export function applyTheme(theme: AppTheme) {
	const resolved = resolveTheme(theme);
	document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function watchTheme(theme: AppTheme) {
	applyTheme(theme);

	if (theme !== "auto") {
		return;
	}

	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleChange = () => applyTheme("auto");

	mediaQuery.addEventListener("change", handleChange);
	return () => mediaQuery.removeEventListener("change", handleChange);
}

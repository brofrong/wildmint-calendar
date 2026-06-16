import { SettingsRow } from "@/components/settings/settings-row";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type AppTheme, useSettingsStore } from "@/stores/settings-store";

const themeLabels: Record<AppTheme, string> = {
	auto: "Авто",
	light: "Светлая",
	dark: "Тёмная",
};

export function ThemeSetting() {
	const theme = useSettingsStore((state) => state.theme);
	const setTheme = useSettingsStore((state) => state.setTheme);

	return (
		<SettingsRow label="Тема приложения">
			<Select
				value={theme}
				onValueChange={(value) => setTheme(value as AppTheme)}
			>
				<SelectTrigger size="sm" className="w-32">
					<SelectValue>{themeLabels[theme]}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="auto">Авто</SelectItem>
					<SelectItem value="light">Светлая</SelectItem>
					<SelectItem value="dark">Тёмная</SelectItem>
				</SelectContent>
			</Select>
		</SettingsRow>
	);
}

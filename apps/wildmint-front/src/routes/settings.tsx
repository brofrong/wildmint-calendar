import { createFileRoute } from "@tanstack/react-router";

import { AppVersionBadge } from "@/components/settings/app-version-badge";
import { CalendarCellSizeSetting } from "@/components/settings/calendar-cell-size-setting";
import { DevTimeSetting } from "@/components/settings/dev-time-setting";
import { InstallAppSetting } from "@/components/settings/install-app-setting";
import { SceneSettingRow } from "@/components/settings/scenes-setting";
import { SettingsSection } from "@/components/settings/settings-section";
import { ThemeSetting } from "@/components/settings/theme-setting";
import { SCENES } from "@/lib/events";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
	return (
		<div className="mx-auto w-full max-w-sm space-y-6 p-4 md:max-w-md">
			<h1 className="text-2xl font-semibold">Настройки</h1>

			<SettingsSection title="Настройки приложения">
				<ThemeSetting key="theme" />
				<InstallAppSetting key="install-app" />
			</SettingsSection>

			<SettingsSection title="Календарь">
				<CalendarCellSizeSetting key="calendar-cell-size" />
			</SettingsSection>

			<SettingsSection title="Сцены на календаре">
				{SCENES.map((scene) => (
					<SceneSettingRow key={scene} scene={scene} />
				))}
			</SettingsSection>

			{import.meta.env.DEV ? (
				<SettingsSection title="Разработка">
					<DevTimeSetting key="dev-time" />
				</SettingsSection>
			) : null}

			<AppVersionBadge />
		</div>
	);
}

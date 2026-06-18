import { createFileRoute } from "@tanstack/react-router";

import { AboutAppSetting } from "@/components/settings/about-app-setting";
import { AppVersionBadge } from "@/components/settings/app-version-badge";
import { AuthSetting } from "@/components/settings/auth-setting";
import { CalendarCellSizeSetting } from "@/components/settings/calendar-cell-size-setting";
import { DevTimeSetting } from "@/components/settings/dev-time-setting";
import { InstallAppSetting } from "@/components/settings/install-app-setting";
import { SceneSettingRow } from "@/components/settings/scenes-setting";
import { ServerStatusSetting } from "@/components/settings/server-status-setting";
import { SettingsSection } from "@/components/settings/settings-section";
import { ThemeSetting } from "@/components/settings/theme-setting";
import { SCENES } from "@/lib/events";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
	return (
		<div className="mx-auto w-full space-y-6 p-6 pb-24 md:max-w-md">
			<h1 className="text-2xl font-semibold">Настройки</h1>

			<SettingsSection title="Профиль">
				<AuthSetting key="auth" />
			</SettingsSection>

			<SettingsSection title="Настройки приложения">
				<ThemeSetting key="theme" />
				<ServerStatusSetting key="server-status" />
				<InstallAppSetting key="install-app" />
				<AboutAppSetting key="about-app" />
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

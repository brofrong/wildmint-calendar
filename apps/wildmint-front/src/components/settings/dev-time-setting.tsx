import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/stores/settings-store";

export function DevTimeSetting() {
	const devMockTimeEnabled = useSettingsStore(
		(state) => state.devMockTimeEnabled,
	);
	const devMockDate = useSettingsStore((state) => state.devMockDate);
	const devMockTime = useSettingsStore((state) => state.devMockTime);
	const setDevMockTimeEnabled = useSettingsStore(
		(state) => state.setDevMockTimeEnabled,
	);
	const setDevMockDate = useSettingsStore((state) => state.setDevMockDate);
	const setDevMockTime = useSettingsStore((state) => state.setDevMockTime);

	return (
		<div className="space-y-3 px-4 py-3">
			<label className="flex items-center justify-between gap-4">
				<span className="text-sm">Тестовое время</span>
				<input
					type="checkbox"
					checked={devMockTimeEnabled}
					onChange={(event) => setDevMockTimeEnabled(event.target.checked)}
					className="size-4 accent-primary"
				/>
			</label>

			<div className="space-y-2">
				<Label htmlFor="dev-mock-date" className="text-sm text-muted-foreground">
					Дата (календарь и любимые)
				</Label>
				<input
					id="dev-mock-date"
					type="date"
					value={devMockDate}
					disabled={!devMockTimeEnabled}
					onChange={(event) => setDevMockDate(event.target.value)}
					className="h-8 w-full rounded-lg border border-input bg-background px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="dev-mock-time" className="text-sm text-muted-foreground">
					Время (календарь и любимые)
				</Label>
				<input
					id="dev-mock-time"
					type="time"
					value={devMockTime}
					disabled={!devMockTimeEnabled}
					onChange={(event) => setDevMockTime(event.target.value)}
					className="h-8 w-full rounded-lg border border-input bg-background px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>
		</div>
	);
}

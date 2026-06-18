import { SettingsRow } from "@/components/settings/settings-row";
import { cn } from "@/lib/utils";
import {
	type ServerStatus,
	useServerStatusStore,
} from "@/stores/server-status-store";

const statusLabels: Record<ServerStatus, string> = {
	checking: "Проверка…",
	online: "Доступен",
	offline: "Недоступен",
};

const statusDotClasses: Record<ServerStatus, string> = {
	checking: "bg-amber-400",
	online: "bg-emerald-500",
	offline: "bg-red-500",
};

function formatLastChecked(value: string | null) {
	if (!value) {
		return null;
	}

	return new Intl.DateTimeFormat("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(new Date(value));
}

export function ServerStatusSetting() {
	const status = useServerStatusStore((state) => state.status);
	const lastCheckedAt = useServerStatusStore((state) => state.lastCheckedAt);
	const lastCheckedLabel = formatLastChecked(lastCheckedAt);

	return (
		<SettingsRow label="Сервер">
			<div className="flex flex-col items-end gap-0.5">
				<div className="flex items-center gap-2">
					<span
						className={cn(
							"size-2 rounded-full",
							statusDotClasses[status],
							status === "checking" && "animate-pulse",
						)}
						aria-hidden
					/>
					<span className="text-sm">{statusLabels[status]}</span>
				</div>
				{lastCheckedLabel ? (
					<span className="text-xs text-muted-foreground">
						Обновлено в {lastCheckedLabel}
					</span>
				) : null}
			</div>
		</SettingsRow>
	);
}

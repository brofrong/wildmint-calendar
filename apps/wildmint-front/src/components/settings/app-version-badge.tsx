import { APP_VERSION } from "@/lib/app-version";

export function AppVersionBadge() {
	return (
		<div className="rounded-xl border border-border bg-card px-4 py-3 text-center">
			<p className="text-sm text-muted-foreground">
				Версия приложения{" "}
				<span className="font-medium text-foreground">{APP_VERSION}</span>
			</p>
		</div>
	);
}

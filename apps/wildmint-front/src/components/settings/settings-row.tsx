import type { ReactNode } from "react";

interface SettingsRowProps {
	label: string;
	children: ReactNode;
}

export function SettingsRow({ label, children }: SettingsRowProps) {
	return (
		<div className="flex items-center justify-between gap-4 px-4 py-3">
			<span className="text-sm">{label}</span>
			{children}
		</div>
	);
}

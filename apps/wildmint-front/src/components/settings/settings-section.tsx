import { Children, Fragment, isValidElement, type ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

interface SettingsSectionProps {
	title: string;
	children: ReactNode;
}

function getChildKey(item: ReactNode, index: number) {
	if (isValidElement(item) && item.key != null) {
		return String(item.key);
	}

	return `settings-item-${index}`;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
	const items = Children.toArray(children);

	return (
		<section className="space-y-3">
			<h2 className="px-1 text-sm font-medium text-muted-foreground">
				{title}
			</h2>
			<div className="overflow-hidden rounded-xl border border-border bg-card">
				{items.map((item, index) => (
					<Fragment key={getChildKey(item, index)}>
						{index > 0 ? <Separator /> : null}
						{item}
					</Fragment>
				))}
			</div>
		</section>
	);
}

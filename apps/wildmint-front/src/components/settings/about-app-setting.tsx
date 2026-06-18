import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function AboutAppSetting() {
	return (
		<Link
			to="/about"
			className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/50"
		>
			<span className="text-sm">О приложении</span>
			<ChevronRight className="size-4 text-muted-foreground" />
		</Link>
	);
}

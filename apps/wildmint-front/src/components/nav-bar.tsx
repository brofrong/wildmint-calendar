import { Link } from "@tanstack/react-router";
import { Calendar, Heart, Map as MapIcon, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
	{
		to: "/",
		label: "Любимые",
		icon: Heart,
		exact: true,
	},
	{
		to: "/calendar",
		label: "Календарь",
		icon: Calendar,
		exact: false,
	},
	{
		to: "/map",
		label: "Карта",
		icon: MapIcon,
		exact: false,
	},
	{
		to: "/settings",
		label: "Настройки",
		icon: Settings,
		exact: false,
	},
] as const;

export function NavBar() {
	return (
		<nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
			<div className="pointer-events-auto flex w-full max-w-sm items-stretch gap-0.5 rounded-full border border-border/40 bg-background/70 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-2xl backdrop-saturate-150 supports-backdrop-filter:bg-background/55 dark:border-white/10 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.2)] md:max-w-md">
				{navItems.map(({ to, label, icon: Icon, exact }) => (
					<Button
						key={to}
						variant="ghost"
						asChild
						className="h-auto flex-1 rounded-full p-0"
					>
						<Link
							to={to}
							activeOptions={{ exact }}
							className={cn(
								"flex flex-col items-center gap-0.5 rounded-full px-1 py-2 text-muted-foreground transition-colors",
							)}
						>
							{({ isActive }) => (
								<>
									<span
										className={cn(
											"flex flex-col items-center gap-0.5 rounded-full px-3 py-1 transition-colors",
											isActive && "bg-primary/15 text-primary",
										)}
									>
										<Icon className="size-5" />
										<span className="text-[0.65rem] font-medium leading-none">
											{label}
										</span>
									</span>
								</>
							)}
						</Link>
					</Button>
				))}
			</div>
		</nav>
	);
}

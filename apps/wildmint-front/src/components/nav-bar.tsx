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
			<div className="pointer-events-auto flex w-full max-w-sm items-stretch gap-1 rounded-full border border-border/40 bg-background/70 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-2xl backdrop-saturate-150 supports-backdrop-filter:bg-background/55 dark:border-white/10 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.2)] md:max-w-md">
				{navItems.map(({ to, label, icon: Icon, exact }) => (
					<Button
						key={to}
						variant="ghost"
						asChild
						className="h-auto min-w-0 flex-1 shrink basis-0 rounded-full p-0"
					>
						<Link
							to={to}
							activeOptions={{ exact }}
							className="relative flex h-full w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 text-muted-foreground transition-colors"
						>
							{({ isActive }) => (
								<>
									<span
										aria-hidden
										className={cn(
											"absolute inset-0 rounded-full transition-colors",
											isActive && "bg-primary/15",
										)}
									/>
									<Icon
										className={cn(
											"relative size-5",
											isActive && "text-primary",
										)}
									/>
									<span
										className={cn(
											"relative w-full truncate text-center text-[0.65rem] font-medium leading-none",
											isActive && "text-primary",
										)}
									>
										{label}
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

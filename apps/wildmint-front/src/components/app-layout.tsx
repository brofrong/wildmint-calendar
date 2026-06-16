import { Outlet } from "@tanstack/react-router";

import { NavBar } from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

export function AppLayout() {
	return (
		<div className="flex min-h-dvh flex-col">
			<ThemeProvider />
			<main className="flex-1 pb-24">
				<Outlet />
			</main>
			<NavBar />
		</div>
	);
}

import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { NavBar } from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { registerServiceWorker } from "@/lib/register-sw";

export function AppLayout() {
	useEffect(() => {
		registerServiceWorker();
	}, []);

	return (
		<div className="flex h-dvh flex-col overflow-hidden">
			<ThemeProvider />
			<main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
				<Outlet />
			</main>
			<NavBar />
		</div>
	);
}

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
		<div className="flex min-h-dvh flex-col">
			<ThemeProvider />
			<main className="flex-1 pb-24">
				<Outlet />
			</main>
			<NavBar />
		</div>
	);
}

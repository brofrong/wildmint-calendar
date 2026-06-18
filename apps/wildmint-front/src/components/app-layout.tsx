import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { NavBar } from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { registerServiceWorker } from "@/lib/register-sw";
import { useAuthBootstrap } from "@/lib/use-auth-bootstrap";
import { useServerPing } from "@/lib/use-server-ping";

export function AppLayout() {
	useServerPing();
	useAuthBootstrap();

	useEffect(() => {
		registerServiceWorker();
	}, []);

	return (
		<TooltipProvider>
			<div className="flex h-dvh flex-col overflow-hidden">
				<ThemeProvider />
				<main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
					<Outlet />
				</main>
				<NavBar />
			</div>
		</TooltipProvider>
	);
}

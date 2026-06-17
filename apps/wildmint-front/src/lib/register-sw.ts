export function registerServiceWorker() {
	if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
		return;
	}

	const register = async () => {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});

			registration.addEventListener("updatefound", () => {
				const newWorker = registration.installing;
				if (!newWorker) return;

				newWorker.addEventListener("statechange", () => {
					if (
						newWorker.state === "installed" &&
						navigator.serviceWorker.controller
					) {
						newWorker.postMessage({ type: "SKIP_WAITING" });
					}
				});
			});

			let refreshing = false;
			navigator.serviceWorker.addEventListener("controllerchange", () => {
				if (refreshing) return;
				refreshing = true;
				window.location.reload();
			});
		} catch (error) {
			console.error("Service worker registration failed:", error);
		}
	};

	if (document.readyState === "complete") {
		void register();
	} else {
		window.addEventListener("load", () => void register());
	}
}

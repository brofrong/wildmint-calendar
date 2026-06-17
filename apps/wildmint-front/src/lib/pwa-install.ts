type BeforeInstallPromptEvent = Event & {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

export function isStandaloneApp(): boolean {
	if (typeof window === "undefined") return false;

	return (
		window.matchMedia("(display-mode: standalone)").matches ||
		(window.navigator as Navigator & { standalone?: boolean }).standalone ===
			true
	);
}

export function isIosDevice(): boolean {
	if (typeof navigator === "undefined") return false;

	return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function isInstallableBrowser(): boolean {
	if (typeof navigator === "undefined") return false;

	const ua = navigator.userAgent.toLowerCase();
	const isIos = /iphone|ipad|ipod/.test(ua);
	const isSafari =
		/safari/.test(ua) && !/crios|fxios|edgios|chrome|android/.test(ua);

	if (isIos) return isSafari;
	return true;
}

export function canShowInstallPrompt(): boolean {
	if (isStandaloneApp()) return false;
	if (!isInstallableBrowser()) return false;
	if (isIosDevice()) return true;
	return deferredInstallPrompt !== null;
}

export function captureInstallPrompt(event: Event) {
	event.preventDefault();
	deferredInstallPrompt = event as BeforeInstallPromptEvent;
}

export async function promptInstall(): Promise<"accepted" | "dismissed" | "ios"> {
	if (isIosDevice()) return "ios";
	if (!deferredInstallPrompt) return "dismissed";

	await deferredInstallPrompt.prompt();
	const { outcome } = await deferredInstallPrompt.userChoice;
	deferredInstallPrompt = null;
	return outcome;
}

export function subscribeInstallPrompt(listener: () => void) {
	const handleAvailable = () => listener();

	window.addEventListener("beforeinstallprompt", handleAvailable);
	window.addEventListener("appinstalled", handleAvailable);

	return () => {
		window.removeEventListener("beforeinstallprompt", handleAvailable);
		window.removeEventListener("appinstalled", handleAvailable);
	};
}

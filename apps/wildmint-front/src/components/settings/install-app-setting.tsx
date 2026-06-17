import { Share, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

import { SettingsRow } from "@/components/settings/settings-row";
import { Button } from "@/components/ui/button";
import {
	canShowInstallPrompt,
	captureInstallPrompt,
	isIosDevice,
	isStandaloneApp,
	promptInstall,
	subscribeInstallPrompt,
} from "@/lib/pwa-install";

export function InstallAppSetting() {
	const [visible, setVisible] = useState(false);
	const [showIosHelp, setShowIosHelp] = useState(false);

	useEffect(() => {
		const update = () => {
			setVisible(canShowInstallPrompt());
		};

		update();

		const handleBeforeInstallPrompt = (event: Event) => {
			captureInstallPrompt(event);
			update();
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		const unsubscribe = subscribeInstallPrompt(update);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt,
			);
			unsubscribe();
		};
	}, []);

	if (!visible || isStandaloneApp()) {
		return null;
	}

	const handleInstall = async () => {
		if (isIosDevice()) {
			setShowIosHelp((current) => !current);
			return;
		}

		const outcome = await promptInstall();
		if (outcome === "accepted") {
			setVisible(false);
		}
	};

	return (
		<div className="border-t border-border">
			<SettingsRow label="Установить приложение">
				<Button size="sm" variant="outline" onClick={() => void handleInstall()}>
					<SquarePlus data-icon="inline-start" />
					Установить
				</Button>
			</SettingsRow>

			{showIosHelp ? (
				<div className="space-y-2 px-4 pb-4 text-sm text-muted-foreground">
					<p>
						В Safari на iPhone нет кнопки «Установить». Добавьте приложение
						вручную:
					</p>
					<ol className="list-decimal space-y-1 pl-5">
						<li>
							Нажмите{" "}
							<Share className="inline size-4 align-text-bottom" /> «Поделиться»
							внизу экрана
						</li>
						<li>Выберите «На экран Домой»</li>
						<li>Нажмите «Добавить»</li>
					</ol>
				</div>
			) : null}
		</div>
	);
}

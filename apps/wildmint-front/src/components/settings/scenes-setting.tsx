import { SettingsRow } from "@/components/settings/settings-row";
import { Label } from "@/components/ui/label";
import { getSceneColor, type Scene } from "@/lib/events";
import { useSettingsStore } from "@/stores/settings-store";
import { cn } from "@/lib/utils";

type SceneSettingRowProps = {
	scene: Scene;
};

export function SceneSettingRow({ scene }: SceneSettingRowProps) {
	const visibleScenes = useSettingsStore((state) => state.visibleScenes);
	const setSceneVisible = useSettingsStore((state) => state.setSceneVisible);
	const isVisible = visibleScenes.includes(scene);
	const isLastVisible = isVisible && visibleScenes.length === 1;

	return (
		<SettingsRow label={scene}>
			<div className="flex items-center gap-2">
				<span
					className="size-2.5 rounded-full"
					style={{ backgroundColor: getSceneColor(scene) }}
					aria-hidden
				/>
				<Label className="sr-only">{scene}</Label>
				<input
					type="checkbox"
					checked={isVisible}
					disabled={isLastVisible}
					onChange={(event) => setSceneVisible(scene, event.target.checked)}
					className={cn(
						"size-4 rounded border border-input accent-primary",
						isLastVisible && "opacity-50",
					)}
					aria-label={`Показывать сцену ${scene}`}
				/>
			</div>
		</SettingsRow>
	);
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CalendarCellSize } from "@/lib/calendar/constants";
import { SCENES, type Scene } from "@/lib/events";

export type AppTheme = "light" | "dark" | "auto";

export const DEFAULT_VISIBLE_SCENES: Scene[] = ["СИРЕНА", "ТИТАНА", "МАЯК"];

interface SettingsState {
	theme: AppTheme;
	visibleScenes: Scene[];
	calendarCellSize: CalendarCellSize;
	lastCalendarDate: string | null;
	devMockTimeEnabled: boolean;
	devMockDate: string;
	devMockTime: string;
	setTheme: (theme: AppTheme) => void;
	setSceneVisible: (scene: Scene, visible: boolean) => void;
	setCalendarCellSize: (size: CalendarCellSize) => void;
	setLastCalendarDate: (date: string) => void;
	setDevMockTimeEnabled: (enabled: boolean) => void;
	setDevMockDate: (date: string) => void;
	setDevMockTime: (time: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: "dark",
			visibleScenes: DEFAULT_VISIBLE_SCENES,
			calendarCellSize: "md",
			lastCalendarDate: null,
			devMockTimeEnabled: false,
			devMockDate: "2026-06-19",
			devMockTime: "20:00",
			setTheme: (theme) => set({ theme }),
			setSceneVisible: (scene, visible) =>
				set((state) => {
					if (
						!visible &&
						state.visibleScenes.length === 1 &&
						state.visibleScenes[0] === scene
					) {
						return state;
					}

					const nextScenes = visible
						? [...new Set([...state.visibleScenes, scene])]
						: state.visibleScenes.filter((item) => item !== scene);

					return {
						visibleScenes: SCENES.filter((item) => nextScenes.includes(item)),
					};
				}),
			setCalendarCellSize: (calendarCellSize) => set({ calendarCellSize }),
			setLastCalendarDate: (lastCalendarDate) => set({ lastCalendarDate }),
			setDevMockTimeEnabled: (devMockTimeEnabled) =>
				set({ devMockTimeEnabled }),
			setDevMockDate: (devMockDate) => set({ devMockDate }),
			setDevMockTime: (devMockTime) => set({ devMockTime }),
		}),
		{
			name: "wildmint-settings",
			version: 5,
			migrate: (persistedState) => {
				const state = persistedState as Partial<SettingsState>;

				return {
					...state,
					visibleScenes: state.visibleScenes ?? DEFAULT_VISIBLE_SCENES,
					calendarCellSize: state.calendarCellSize ?? "md",
					lastCalendarDate: state.lastCalendarDate ?? null,
					devMockTimeEnabled: state.devMockTimeEnabled ?? false,
					devMockDate: state.devMockDate ?? "2026-06-19",
					devMockTime: state.devMockTime ?? "20:00",
				};
			},
		},
	),
);

export function useVisibleScenes(): Scene[] {
	const visibleScenes = useSettingsStore((state) => state.visibleScenes);

	return SCENES.filter((scene) => visibleScenes.includes(scene));
}

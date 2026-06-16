import {
	CALENDAR_CELL_SIZES,
	type CalendarCellSize,
} from "@/lib/calendar/constants";
import { useSettingsStore } from "@/stores/settings-store";

const sizeLabels: Record<CalendarCellSize, string> = {
	sm: "Маленький",
	md: "Средний",
	lg: "Большой",
	xl: "Очень большой",
};

export function CalendarCellSizeSetting() {
	const calendarCellSize = useSettingsStore((state) => state.calendarCellSize);
	const setCalendarCellSize = useSettingsStore(
		(state) => state.setCalendarCellSize,
	);
	const sizeIndex = CALENDAR_CELL_SIZES.indexOf(calendarCellSize);

	return (
		<div className="space-y-3 px-4 py-3">
			<div className="flex items-center justify-between gap-4">
				<span className="text-sm">Размер ячеек</span>
				<span className="text-sm font-medium uppercase text-muted-foreground">
					{calendarCellSize}
				</span>
			</div>

			<div className="space-y-2">
				<input
					type="range"
					min={0}
					max={CALENDAR_CELL_SIZES.length - 1}
					step={1}
					value={sizeIndex}
					onChange={(event) => {
						const nextSize = CALENDAR_CELL_SIZES[Number(event.target.value)];
						if (nextSize) {
							setCalendarCellSize(nextSize);
						}
					}}
					className="h-2 w-full cursor-pointer accent-primary"
					aria-label="Размер ячеек календаря"
					aria-valuetext={sizeLabels[calendarCellSize]}
				/>

				<div className="flex justify-between text-[10px] font-medium uppercase text-muted-foreground">
					{CALENDAR_CELL_SIZES.map((size) => (
						<span
							key={size}
							className={
								size === calendarCellSize ? "text-foreground" : undefined
							}
						>
							{size}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

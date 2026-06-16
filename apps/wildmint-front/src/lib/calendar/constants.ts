export const DAY_START_HOUR = 11;
export const DAY_END_HOUR = 3;
export const HOURS_IN_DAY = 24 - DAY_START_HOUR + DAY_END_HOUR;
export const HOUR_HEIGHT_PX = 60;
export const SCENE_HEADER_HEIGHT_PX = 41;
export const TIME_COLUMN_WIDTH_PX = 56;
export const SCENE_COLUMN_MIN_WIDTH_PX = 140;

export const CALENDAR_CELL_SIZES = ["sm", "md", "lg", "xl"] as const;
export type CalendarCellSize = (typeof CALENDAR_CELL_SIZES)[number];

export const CALENDAR_CELL_SIZE_MIN_HEIGHT: Record<CalendarCellSize, number> = {
	sm: 48,
	md: 72,
	lg: 96,
	xl: 120,
};

export const CALENDAR_CELL_SIZE_SCALE: Record<CalendarCellSize, number> = {
	sm: 0.8,
	md: 1,
	lg: 1.3,
	xl: 1.7,
};

export function getCalendarHeight(hourHeight: number): number {
	return HOURS_IN_DAY * hourHeight;
}

export function getHourHeightForCellSize(
	availableHeight: number,
	cellSize: CalendarCellSize,
): number {
	const baseFill = availableHeight / HOURS_IN_DAY;

	return Math.max(
		CALENDAR_CELL_SIZE_MIN_HEIGHT[cellSize],
		baseFill * CALENDAR_CELL_SIZE_SCALE[cellSize],
	);
}

import { type RefObject, useEffect, useState } from "react";

import {
	type CalendarCellSize,
	getHourHeightForCellSize,
	HOUR_HEIGHT_PX,
	SCENE_HEADER_HEIGHT_PX,
} from "@/lib/calendar/constants";

export function useCalendarHourHeight(
	containerRef: RefObject<HTMLElement | null>,
	cellSize: CalendarCellSize,
): number {
	const [hourHeight, setHourHeight] = useState(HOUR_HEIGHT_PX);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const updateHourHeight = () => {
			const availableHeight = container.clientHeight - SCENE_HEADER_HEIGHT_PX;
			setHourHeight(getHourHeightForCellSize(availableHeight, cellSize));
		};

		updateHourHeight();

		const observer = new ResizeObserver(updateHourHeight);
		observer.observe(container);

		return () => observer.disconnect();
	}, [cellSize, containerRef]);

	return hourHeight;
}

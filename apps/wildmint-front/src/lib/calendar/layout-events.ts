import type { Event } from "@/lib/events";

import { HOUR_HEIGHT_PX } from "./constants";

export type TimedEvent = {
	id: string;
	event: Event;
	startMinutes: number;
	endMinutes: number;
};

export type LayoutedEvent = TimedEvent & {
	top: number;
	height: number;
	left: number;
	width: number;
};

function eventsCollide(a: TimedEvent, b: TimedEvent): boolean {
	return a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;
}

function packCluster(
	columns: TimedEvent[][],
	hourHeight: number,
): LayoutedEvent[] {
	const columnCount = columns.length;
	const layouted: LayoutedEvent[] = [];

	for (const [columnIndex, column] of columns.entries()) {
		for (const timedEvent of column) {
			layouted.push({
				...timedEvent,
				top: (timedEvent.startMinutes / 60) * hourHeight,
				height: Math.max(
					((timedEvent.endMinutes - timedEvent.startMinutes) / 60) * hourHeight,
					20,
				),
				left: (columnIndex / columnCount) * 100,
				width: 100 / columnCount,
			});
		}
	}

	return layouted;
}

export function layoutTimedEvents(
	events: TimedEvent[],
	hourHeight = HOUR_HEIGHT_PX,
): LayoutedEvent[] {
	if (events.length === 0) {
		return [];
	}

	const sorted = [...events].sort(
		(a, b) => a.startMinutes - b.startMinutes || a.endMinutes - b.endMinutes,
	);

	const layouted: LayoutedEvent[] = [];
	const columns: TimedEvent[][] = [];
	let clusterEnd: number | null = null;

	const flushCluster = () => {
		if (columns.length === 0) {
			return;
		}

		layouted.push(...packCluster(columns, hourHeight));
		columns.length = 0;
		clusterEnd = null;
	};

	for (const timedEvent of sorted) {
		if (clusterEnd !== null && timedEvent.startMinutes >= clusterEnd) {
			flushCluster();
		}

		let placed = false;
		for (const column of columns) {
			const lastEvent = column[column.length - 1];
			if (!eventsCollide(lastEvent, timedEvent)) {
				column.push(timedEvent);
				placed = true;
				break;
			}
		}

		if (!placed) {
			columns.push([timedEvent]);
		}

		clusterEnd =
			clusterEnd === null
				? timedEvent.endMinutes
				: Math.max(clusterEnd, timedEvent.endMinutes);
	}

	flushCluster();
	return layouted;
}

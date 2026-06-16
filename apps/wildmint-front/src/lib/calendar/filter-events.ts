import type { Event, Scene } from "@/lib/events";
import { SCENES } from "@/lib/events";

import type { TimedEvent } from "./layout-events";
import {
	DAY_END_MINUTES,
	DAY_START_MINUTES,
	getFestivalDay,
	parseIsoDateTime,
	shiftDate,
	toCalendarMinutes,
} from "./time-utils";

function clipEventToDay(event: Event, day: string): TimedEvent | null {
	const start = parseIsoDateTime(event.startDate);
	const end = parseIsoDateTime(event.endDate);
	const nextDay = shiftDate(day, 1);

	if (
		start.date > nextDay ||
		(start.date === nextDay && start.minutes >= DAY_END_MINUTES)
	) {
		return null;
	}

	if (
		end.date < day ||
		(end.date === day && end.minutes <= DAY_START_MINUTES)
	) {
		return null;
	}

	let clipStartDate = start.date;
	let clipStartMinutes = start.minutes;
	let clipEndDate = end.date;
	let clipEndMinutes = end.minutes;

	if (
		clipStartDate < day ||
		(clipStartDate === day && clipStartMinutes < DAY_START_MINUTES)
	) {
		clipStartDate = day;
		clipStartMinutes = DAY_START_MINUTES;
	}

	if (
		clipEndDate > nextDay ||
		(clipEndDate === nextDay && clipEndMinutes > DAY_END_MINUTES)
	) {
		clipEndDate = nextDay;
		clipEndMinutes = DAY_END_MINUTES;
	}

	const startMinutes = toCalendarMinutes(
		clipStartDate,
		clipStartMinutes,
		day,
	);
	const endMinutes = toCalendarMinutes(clipEndDate, clipEndMinutes, day);

	if (startMinutes >= endMinutes) {
		return null;
	}

	return {
		id: event.id,
		event,
		startMinutes,
		endMinutes,
	};
}

export function getAvailableDates(eventList: Event[]): string[] {
	const dates = new Set<string>();

	for (const event of eventList) {
		const start = parseIsoDateTime(event.startDate);
		const end = parseIsoDateTime(event.endDate);
		dates.add(getFestivalDay(start.date, start.minutes));
		dates.add(getFestivalDay(end.date, end.minutes));
	}

	return [...dates].sort();
}

export function getDefaultDate(eventList: Event[]): string {
	const dates = getAvailableDates(eventList);
	return dates[0] ?? new Date().toISOString().slice(0, 10);
}

export function resolveCalendarDate(
	availableDates: string[],
	lastCalendarDate: string | null,
): string {
	if (lastCalendarDate && availableDates.includes(lastCalendarDate)) {
		return lastCalendarDate;
	}

	return availableDates[0] ?? new Date().toISOString().slice(0, 10);
}

export function getAdjacentAvailableDate(
	availableDates: string[],
	currentDate: string,
	direction: -1 | 1,
): string | null {
	const index = availableDates.indexOf(currentDate);
	if (index === -1) {
		return null;
	}

	const nextIndex = index + direction;
	if (nextIndex < 0 || nextIndex >= availableDates.length) {
		return null;
	}

	return availableDates[nextIndex] ?? null;
}

export function groupTimedEventsByScene(
	eventList: Event[],
	day: string,
): Record<Scene, TimedEvent[]> {
	const grouped = Object.fromEntries(
		SCENES.map((scene) => [scene, [] as TimedEvent[]]),
	) as Record<Scene, TimedEvent[]>;

	for (const event of eventList) {
		const timedEvent = clipEventToDay(event, day);
		if (timedEvent) {
			grouped[event.scene].push(timedEvent);
		}
	}

	return grouped;
}

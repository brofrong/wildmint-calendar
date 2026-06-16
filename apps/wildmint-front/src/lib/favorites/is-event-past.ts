import type { Event } from "@/lib/events";

export function isEventPast(event: Event, now: Date): boolean {
	return new Date(event.endDate).getTime() <= now.getTime();
}

export function findFirstUpcomingEvent(
	favoriteEvents: Event[],
	now: Date,
): Event | null {
	const sorted = [...favoriteEvents].sort((a, b) =>
		a.startDate.localeCompare(b.startDate),
	);

	return sorted.find((event) => !isEventPast(event, now)) ?? null;
}

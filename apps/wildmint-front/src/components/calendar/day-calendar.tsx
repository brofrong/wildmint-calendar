import { useMemo, useRef } from "react";

import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import {
	getAvailableDates,
	groupTimedEventsByScene,
	resolveCalendarDate,
} from "@/lib/calendar/filter-events";
import {
	layoutTimedEvents,
	type LayoutedEvent,
} from "@/lib/calendar/layout-events";
import { useCalendarHourHeight } from "@/lib/calendar/use-calendar-hour-height";
import { useSwipeDayNavigation } from "@/lib/calendar/use-swipe-day-navigation";
import type { Event, Scene } from "@/lib/events";
import { SCENES } from "@/lib/events";
import { useSettingsStore, useVisibleScenes } from "@/stores/settings-store";

type DayCalendarProps = {
	events: Event[];
};

export function DayCalendar({ events }: DayCalendarProps) {
	const visibleScenes = useVisibleScenes();
	const availableDates = useMemo(() => getAvailableDates(events), [events]);
	const lastCalendarDate = useSettingsStore((state) => state.lastCalendarDate);
	const setLastCalendarDate = useSettingsStore(
		(state) => state.setLastCalendarDate,
	);
	const calendarCellSize = useSettingsStore((state) => state.calendarCellSize);
	const selectedDate = useMemo(
		() => resolveCalendarDate(availableDates, lastCalendarDate),
		[availableDates, lastCalendarDate],
	);
	const swipeContainerRef = useRef<HTMLDivElement>(null);
	const gridScrollRef = useRef<HTMLDivElement>(null);
	const hourHeight = useCalendarHourHeight(swipeContainerRef, calendarCellSize);

	useSwipeDayNavigation({
		containerRef: swipeContainerRef,
		scrollRef: gridScrollRef,
		selectedDate,
		availableDates,
		onDateChange: setLastCalendarDate,
	});

	const eventsByScene = useMemo(() => {
		const grouped = groupTimedEventsByScene(events, selectedDate);

		return SCENES.reduce(
			(acc, scene) => {
				acc[scene] = layoutTimedEvents(grouped[scene], hourHeight);
				return acc;
			},
			{} as Record<Scene, LayoutedEvent[]>,
		);
	}, [events, hourHeight, selectedDate]);

	return (
		<div className="flex h-[calc(100dvh-6rem)] flex-col">
			<CalendarHeader
				date={selectedDate}
				availableDates={availableDates}
				onDateChange={setLastCalendarDate}
			/>
			<div ref={swipeContainerRef} className="min-h-0 flex-1">
				<CalendarGrid
					ref={gridScrollRef}
					festivalDay={selectedDate}
					hourHeight={hourHeight}
					visibleScenes={visibleScenes}
					eventsByScene={eventsByScene}
				/>
			</div>
		</div>
	);
}

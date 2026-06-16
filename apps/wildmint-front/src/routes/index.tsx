import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

import { FavoriteEventCard } from "@/components/favorites/favorite-event-card";
import { FavoritesDayHeader } from "@/components/favorites/favorites-day-header";
import { FavoritesEmptyState } from "@/components/favorites/favorites-empty-state";
import { useEffectiveNow } from "@/lib/calendar/use-effective-now";
import { parseIsoDateTime } from "@/lib/calendar/time-utils";
import { FESTIVAL_DATES } from "@/lib/favorites/constants";
import { findFirstUpcomingEvent } from "@/lib/favorites/is-event-past";
import { events, type Event } from "@/lib/events";
import { useFavoritesStore } from "@/stores/favorites-store";

export const Route = createFileRoute("/")({ component: FavoritesPage });

function groupEventsByDate(favoriteEvents: Event[]): Map<string, Event[]> {
	const grouped = new Map<string, Event[]>();

	for (const event of favoriteEvents) {
		const { date } = parseIsoDateTime(event.startDate);
		const dayEvents = grouped.get(date) ?? [];
		dayEvents.push(event);
		grouped.set(date, dayEvents);
	}

	for (const dayEvents of grouped.values()) {
		dayEvents.sort((a, b) => a.startDate.localeCompare(b.startDate));
	}

	return grouped;
}

function FavoritesPage() {
	const favoriteEventIds = useFavoritesStore((state) => state.favoriteEventIds);
	const now = useEffectiveNow();

	const eventsByDate = useMemo(() => {
		const idSet = new Set(favoriteEventIds);
		const favoriteEvents = events.filter((event) => idSet.has(event.id));

		return groupEventsByDate(favoriteEvents);
	}, [favoriteEventIds]);

	const firstUpcomingEventId = useMemo(() => {
		const idSet = new Set(favoriteEventIds);
		const favoriteEvents = events.filter((event) => idSet.has(event.id));

		return findFirstUpcomingEvent(favoriteEvents, now)?.id ?? null;
	}, [favoriteEventIds, now]);

	useEffect(() => {
		if (!firstUpcomingEventId) {
			return;
		}

		const frame = window.requestAnimationFrame(() => {
			document
				.getElementById(`favorite-event-${firstUpcomingEventId}`)
				?.scrollIntoView({ behavior: "smooth", block: "start" });
		});

		return () => window.cancelAnimationFrame(frame);
	}, [firstUpcomingEventId]);

	const daysWithEvents = FESTIVAL_DATES.filter((date) =>
		eventsByDate.has(date),
	);
	const hasFavorites = daysWithEvents.length > 0;

	return (
		<div className="mx-auto w-full max-w-sm space-y-6 p-4 md:max-w-md">
			<h1 className="text-2xl font-semibold">Любимые</h1>

			{!hasFavorites ? (
				<FavoritesEmptyState />
			) : (
				<div className="space-y-8">
					{daysWithEvents.map((date) => {
						const dayEvents = eventsByDate.get(date) ?? [];

						return (
							<section key={date} className="space-y-4">
								<FavoritesDayHeader
									date={date}
									eventCount={dayEvents.length}
								/>
								<div className="space-y-3">
									{dayEvents.map((event) => (
										<FavoriteEventCard key={event.id} event={event} now={now} />
									))}
								</div>
							</section>
						);
					})}
				</div>
			)}
		</div>
	);
}

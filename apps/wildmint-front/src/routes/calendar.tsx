import { createFileRoute } from "@tanstack/react-router";

import { DayCalendar } from "@/components/calendar/day-calendar";
import { events } from "@/lib/events";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
	return (
		<div className="h-full">
			<DayCalendar events={events} />
		</div>
	);
}

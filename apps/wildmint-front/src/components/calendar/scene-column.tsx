import { CalendarEventBlock } from "@/components/calendar/calendar-event-block";
import {
	getCalendarHeight,
	HOURS_IN_DAY,
	SCENE_COLUMN_MIN_WIDTH_PX,
} from "@/lib/calendar/constants";
import type { LayoutedEvent } from "@/lib/calendar/layout-events";
import type { Scene } from "@/lib/events";

type SceneColumnProps = {
	scene: Scene;
	hourHeight: number;
	events: LayoutedEvent[];
};

export function SceneColumn({ scene, hourHeight, events }: SceneColumnProps) {
	const calendarHeight = getCalendarHeight(hourHeight);

	return (
		<div
			className="relative border-r"
			style={{
				minWidth: SCENE_COLUMN_MIN_WIDTH_PX,
				height: calendarHeight,
			}}
		>
			{Array.from({ length: HOURS_IN_DAY }, (_, hour) => (
				<div
					key={`grid-hour-${hour}`}
					className="absolute inset-x-0 border-t border-border/60"
					style={{ top: hour * hourHeight }}
				/>
			))}

			{events.map((layout) => (
				<CalendarEventBlock key={layout.id} layout={layout} />
			))}
		</div>
	);
}

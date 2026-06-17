import { forwardRef } from "react";

import { CurrentTimeIndicator } from "@/components/calendar/current-time-indicator";
import { SceneColumn } from "@/components/calendar/scene-column";
import { TimeGutter } from "@/components/calendar/time-gutter";
import {
	getCalendarHeight,
	SCENE_COLUMN_MIN_WIDTH_PX,
	TIME_COLUMN_WIDTH_PX,
} from "@/lib/calendar/constants";
import type { LayoutedEvent } from "@/lib/calendar/layout-events";
import { useCurrentTimeLineTop } from "@/lib/calendar/use-current-time-line";
import type { Scene } from "@/lib/events";

type CalendarGridProps = {
	festivalDay: string;
	hourHeight: number;
	visibleScenes: Scene[];
	eventsByScene: Record<Scene, LayoutedEvent[]>;
};

export const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
	function CalendarGrid(
		{ festivalDay, hourHeight, visibleScenes, eventsByScene },
		ref,
	) {
		const calendarHeight = getCalendarHeight(hourHeight);
		const currentTimeTop = useCurrentTimeLineTop(festivalDay, hourHeight);

		return (
			<div ref={ref} className="h-full overflow-auto">
				<div
					className="flex min-h-full min-w-max flex-col"
					style={{
						width:
							TIME_COLUMN_WIDTH_PX +
							visibleScenes.length * SCENE_COLUMN_MIN_WIDTH_PX,
					}}
				>
					<div className="sticky top-0 z-30 flex shrink-0 border-b bg-background">
						<div
							className="shrink-0 border-r bg-background"
							style={{ width: TIME_COLUMN_WIDTH_PX }}
						/>
						{visibleScenes.map((scene) => (
							<div
								key={scene}
								className="shrink-0 border-r px-2 py-2 text-center text-xs font-semibold"
								style={{ minWidth: SCENE_COLUMN_MIN_WIDTH_PX }}
							>
								{scene}
							</div>
						))}
					</div>

					<div
						className="relative z-0 flex flex-1"
						style={{ minHeight: calendarHeight }}
					>
						<TimeGutter hourHeight={hourHeight} />
						{visibleScenes.map((scene) => (
							<SceneColumn
								key={scene}
								scene={scene}
								hourHeight={hourHeight}
								events={eventsByScene[scene]}
							/>
						))}
						{currentTimeTop !== null ? (
							<CurrentTimeIndicator top={currentTimeTop} />
						) : null}
					</div>
				</div>
			</div>
		);
	},
);

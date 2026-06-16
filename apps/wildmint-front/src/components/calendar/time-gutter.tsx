import {
	getCalendarHeight,
	HOURS_IN_DAY,
	SCENE_COLUMN_MIN_WIDTH_PX,
	TIME_COLUMN_WIDTH_PX,
} from "@/lib/calendar/constants";
import { formatCalendarHourLabel } from "@/lib/calendar/time-utils";

type TimeGutterProps = {
	hourHeight: number;
};

export function TimeGutter({ hourHeight }: TimeGutterProps) {
	const calendarHeight = getCalendarHeight(hourHeight);

	return (
		<div
			className="relative shrink-0 border-r bg-background"
			style={{ height: calendarHeight, width: TIME_COLUMN_WIDTH_PX }}
		>
			{Array.from({ length: HOURS_IN_DAY }, (_, hour) => (
				<div
					key={`hour-${hour}`}
					className="absolute right-2 -translate-y-1/2 text-xs text-muted-foreground"
					style={{ top: hour * hourHeight }}
				>
					{formatCalendarHourLabel(hour)}
				</div>
			))}
		</div>
	);
}

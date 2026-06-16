import { useMemo } from "react";

import { getNowCalendarMinutes } from "@/lib/calendar/time-utils";
import { useEffectiveNow } from "@/lib/calendar/use-effective-now";

export function useCurrentTimeLineTop(
	festivalDay: string,
	hourHeight: number,
): number | null {
	const now = useEffectiveNow();

	const calendarMinutes = useMemo(
		() => getNowCalendarMinutes(festivalDay, now),
		[festivalDay, now],
	);

	if (calendarMinutes === null) {
		return null;
	}

	return (calendarMinutes / 60) * hourHeight;
}

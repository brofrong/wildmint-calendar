import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAdjacentAvailableDate } from "@/lib/calendar/filter-events";
import { formatDisplayDate } from "@/lib/calendar/time-utils";

type CalendarHeaderProps = {
	date: string;
	availableDates: string[];
	onDateChange: (date: string) => void;
};

export function CalendarHeader({
	date,
	availableDates,
	onDateChange,
}: CalendarHeaderProps) {
	const previousDate = getAdjacentAvailableDate(availableDates, date, -1);
	const nextDate = getAdjacentAvailableDate(availableDates, date, 1);

	const goToPreviousDay = () => {
		if (previousDate) {
			onDateChange(previousDate);
		}
	};

	const goToNextDay = () => {
		if (nextDate) {
			onDateChange(nextDate);
		}
	};

	return (
		<div className="flex items-center gap-2 border-b bg-background px-4 py-3 md:justify-between md:gap-3">
			<h1 className="hidden truncate text-lg font-semibold capitalize md:block">
				{formatDisplayDate(date)}
			</h1>

			<div className="flex min-w-0 flex-1 items-center gap-2 md:flex-initial">
				<Button
					variant="outline"
					size="icon"
					aria-label="Предыдущий день"
					onClick={goToPreviousDay}
					disabled={!previousDate}
					className="shrink-0"
				>
					<ChevronLeft />
				</Button>

				<select
					value={date}
					onChange={(event) => onDateChange(event.target.value)}
					className="h-9 min-w-0 flex-1 truncate rounded-lg border border-input bg-background px-2 text-sm md:h-8 md:max-w-[9.5rem] md:flex-none"
				>
					{availableDates.map((availableDate) => (
						<option key={availableDate} value={availableDate}>
							{formatDisplayDate(availableDate)}
						</option>
					))}
				</select>

				<Button
					variant="outline"
					size="icon"
					aria-label="Следующий день"
					onClick={goToNextDay}
					disabled={!nextDate}
					className="shrink-0"
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}

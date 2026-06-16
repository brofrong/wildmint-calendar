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
		<div className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-4 py-3">
			<div className="min-w-0">
				<h1 className="truncate text-lg font-semibold capitalize">
					{formatDisplayDate(date)}
				</h1>
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="icon"
					aria-label="Предыдущий день"
					onClick={goToPreviousDay}
					disabled={!previousDate}
				>
					<ChevronLeft />
				</Button>

				<select
					value={date}
					onChange={(event) => onDateChange(event.target.value)}
					className="h-8 max-w-[9.5rem] truncate rounded-lg border border-input bg-background px-2 text-sm"
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
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}

import { DAY_END_HOUR, DAY_START_HOUR } from "@/lib/calendar/constants";

const ISO_DATE_TIME_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/;

export const DAY_START_MINUTES = DAY_START_HOUR * 60;
export const DAY_END_MINUTES = DAY_END_HOUR * 60;
export const SAME_DAY_HOURS = 24 - DAY_START_HOUR;

export type ParsedDateTime = {
	date: string;
	minutes: number;
};

export function parseIsoDateTime(iso: string): ParsedDateTime {
	const match = iso.match(ISO_DATE_TIME_RE);
	if (!match) {
		throw new Error(`Invalid ISO date: ${iso}`);
	}

	const [, date, hours, minutes] = match;
	return {
		date,
		minutes: Number(hours) * 60 + Number(minutes),
	};
}

export function formatHourLabel(hour: number): string {
	return `${String(hour).padStart(2, "0")}:00`;
}

export function formatEventTime(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function formatDisplayDate(dateStr: string): string {
	const date = new Date(`${dateStr}T12:00:00`);
	return new Intl.DateTimeFormat("ru-RU", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);
}

export function shiftDate(dateStr: string, days: number): string {
	const date = new Date(`${dateStr}T12:00:00`);
	date.setDate(date.getDate() + days);
	return date.toISOString().slice(0, 10);
}

export function getFestivalDay(date: string, minutes: number): string {
	if (minutes < DAY_END_MINUTES) {
		return shiftDate(date, -1);
	}

	return date;
}

export function toCalendarMinutes(
	date: string,
	minutes: number,
	festivalDay: string,
): number {
	const nextDay = shiftDate(festivalDay, 1);

	if (date === festivalDay) {
		return minutes - DAY_START_MINUTES;
	}

	if (date === nextDay) {
		return SAME_DAY_HOURS * 60 + minutes;
	}

	throw new Error(`Date ${date} is outside festival day ${festivalDay}`);
}

export function getLocalDateTimeParts(date: Date): ParsedDateTime {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return {
		date: `${year}-${month}-${day}`,
		minutes: date.getHours() * 60 + date.getMinutes(),
	};
}

function isWithinFestivalDay(
	date: string,
	minutes: number,
	festivalDay: string,
): boolean {
	const nextDay = shiftDate(festivalDay, 1);

	if (date < festivalDay) {
		return false;
	}

	if (date === festivalDay && minutes < DAY_START_MINUTES) {
		return false;
	}

	if (date > nextDay) {
		return false;
	}

	if (date === nextDay && minutes >= DAY_END_MINUTES) {
		return false;
	}

	return true;
}

export function getCalendarMinutesForDateTime(
	date: string,
	minutes: number,
	festivalDay: string,
): number | null {
	if (!isWithinFestivalDay(date, minutes, festivalDay)) {
		return null;
	}

	return toCalendarMinutes(date, minutes, festivalDay);
}

export function getNowCalendarMinutes(
	festivalDay: string,
	now = new Date(),
): number | null {
	const { date, minutes } = getLocalDateTimeParts(now);
	return getCalendarMinutesForDateTime(date, minutes, festivalDay);
}

export function getCalendarHour(slotIndex: number): number {
	if (slotIndex < SAME_DAY_HOURS) {
		return DAY_START_HOUR + slotIndex;
	}

	return slotIndex - SAME_DAY_HOURS;
}

export function formatCalendarHourLabel(slotIndex: number): string {
	return formatHourLabel(getCalendarHour(slotIndex));
}

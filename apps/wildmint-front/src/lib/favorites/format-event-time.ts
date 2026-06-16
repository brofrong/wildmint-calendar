import { parseIsoDateTime } from "@/lib/calendar/time-utils";

export function formatEventTimeOnly(iso: string): string {
	const { minutes } = parseIsoDateTime(iso);
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function formatEventTimeRange(startIso: string, endIso: string): string {
	return `${formatEventTimeOnly(startIso)} – ${formatEventTimeOnly(endIso)}`;
}

export function formatEventDuration(startIso: string, endIso: string): string {
	const start = new Date(startIso);
	const end = new Date(endIso);
	const totalMinutes = Math.round((end.getTime() - start.getTime()) / 60_000);

	if (totalMinutes < 60) {
		return `${totalMinutes} мин`;
	}

	const hours = Math.floor(totalMinutes / 60);
	const mins = totalMinutes % 60;

	if (mins === 0) {
		return `${hours} ч`;
	}

	return `${hours} ч ${mins} мин`;
}

export function formatMonthShort(dateStr: string): string {
	const date = new Date(`${dateStr}T12:00:00`);

	return new Intl.DateTimeFormat("ru-RU", { month: "short" })
		.format(date)
		.replace(".", "")
		.toUpperCase();
}

export function formatDayNumber(dateStr: string): string {
	return new Intl.DateTimeFormat("ru-RU", { day: "numeric" }).format(
		new Date(`${dateStr}T12:00:00`),
	);
}

export function formatDayLabel(dateStr: string): string {
	const today = new Date();
	const todayStr = today.toISOString().slice(0, 10);

	if (dateStr === todayStr) {
		return "Сегодня";
	}

	return new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(
		new Date(`${dateStr}T12:00:00`),
	);
}

export function formatConcertCount(count: number): string {
	const mod10 = count % 10;
	const mod100 = count % 100;

	if (mod10 === 1 && mod100 !== 11) {
		return `${count} концерт`;
	}

	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
		return `${count} концерта`;
	}

	return `${count} концертов`;
}

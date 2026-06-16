export const FESTIVAL_DATES = [
	"2026-06-18",
	"2026-06-19",
	"2026-06-20",
	"2026-06-21",
] as const;

export type FestivalDate = (typeof FESTIVAL_DATES)[number];

import {
	formatConcertCount,
	formatDayLabel,
	formatDayNumber,
	formatMonthShort,
} from "@/lib/favorites/format-event-time";

type FavoritesDayHeaderProps = {
	date: string;
	eventCount: number;
};

export function FavoritesDayHeader({
	date,
	eventCount,
}: FavoritesDayHeaderProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.35)]">
					<span className="text-xl leading-none font-bold">
						{formatDayNumber(date)}
					</span>
					<span className="text-[10px] leading-tight font-medium tracking-wide">
						{formatMonthShort(date)}
					</span>
				</div>
				<div className="min-w-0">
					<div className="text-lg font-semibold text-sky-400 capitalize">
						{formatDayLabel(date)}
					</div>
					<div className="text-sm text-muted-foreground">
						{formatConcertCount(eventCount)}
					</div>
				</div>
			</div>
			<div className="h-px bg-border" />
		</div>
	);
}

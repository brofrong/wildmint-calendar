import { EventFavoriteButton } from "@/components/calendar/event-favorite-button";
import { FriendLikesIndicator } from "@/components/friends/friend-likes-indicator";
import type { LayoutedEvent } from "@/lib/calendar/layout-events";
import { formatEventTimeRange } from "@/lib/favorites/format-event-time";
import { getSceneColor } from "@/lib/events";
import { useFriendsWhoLikeEvent } from "@/stores/social-store";
import { cn } from "@/lib/utils";

type CalendarEventBlockProps = {
	layout: LayoutedEvent;
};

export function CalendarEventBlock({ layout }: CalendarEventBlockProps) {
	const { event, top, height, left, width } = layout;
	const color = getSceneColor(event.scene);
	const timeRange = formatEventTimeRange(event.startDate, event.endDate);
	const hasImage = Boolean(event.image);
	const friendsWhoLike = useFriendsWhoLikeEvent(event.id);

	return (
		<div
			className={cn(
				"absolute overflow-hidden rounded-md border px-1.5 py-1 text-xs shadow-sm",
				"hover:z-10 hover:shadow-md",
			)}
			style={{
				top,
				height,
				left: `calc(${left}% + 2px)`,
				width: `calc(${width}% - 4px)`,
				borderColor: color,
				backgroundColor: hasImage ? undefined : `${color}22`,
			}}
			title={`${event.artist} (${timeRange})`}
		>
			{hasImage ? (
				<>
					<img
						src={event.image}
						alt=""
						aria-hidden
						loading="lazy"
						className="absolute inset-0 h-full w-full object-cover opacity-35"
					/>
					<div
						className="absolute inset-0"
						style={{ backgroundColor: `${color}66` }}
					/>
				</>
			) : null}

			<div className="relative z-10 min-w-0">
				<div className="wrap-break-word pr-7 font-medium leading-tight">
					{event.artist}
				</div>
				{height >= 28 ? (
					<div className="truncate text-[10px] text-muted-foreground">
						{timeRange}
					</div>
				) : null}
			</div>

			<EventFavoriteButton
				eventId={event.id}
				className="absolute top-0.5 right-0.5 z-10"
			/>

			{friendsWhoLike.length > 0 ? (
				<div className="absolute bottom-0.5 left-0.5 z-10">
					<FriendLikesIndicator
						friends={friendsWhoLike}
						size="sm"
					/>
				</div>
			) : null}
		</div>
	);
}

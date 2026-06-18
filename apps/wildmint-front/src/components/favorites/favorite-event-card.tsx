import { ArtistPhoto } from "@/components/artist-photo";
import { FriendLikesIndicator } from "@/components/friends/friend-likes-indicator";
import type { Event } from "@/lib/events";
import { getSceneColor } from "@/lib/events";
import { isEventPast } from "@/lib/favorites/is-event-past";
import { formatEventTimeOnly } from "@/lib/favorites/format-event-time";
import { useFriendsWhoLikeEvent } from "@/stores/social-store";
import { cn } from "@/lib/utils";

type FavoriteEventCardProps = {
	event: Event;
	now: Date;
};

export function FavoriteEventCard({ event, now }: FavoriteEventCardProps) {
	const color = getSceneColor(event.scene);
	const startTime = formatEventTimeOnly(event.startDate);
	const endTime = formatEventTimeOnly(event.endDate);
	const isPast = isEventPast(event, now);
	const friendsWhoLike = useFriendsWhoLikeEvent(event.id);

	return (
		<article
			id={`favorite-event-${event.id}`}
			className={cn(
				"relative flex scroll-mt-4 overflow-hidden rounded-xl border bg-card",
				isPast && "border-border/60 bg-muted/50 text-muted-foreground",
			)}
		>
			<div
				className={cn("w-1 shrink-0", isPast && "opacity-40")}
				style={{ backgroundColor: color }}
			/>

			<div className="flex min-w-0 flex-1 gap-3 p-3">
				<div className="flex w-12 shrink-0 flex-col items-center pt-0.5">
					<span className="text-base font-bold leading-none">{startTime}</span>
					<div className="mt-1.5 flex flex-col items-center">
						<div className="h-3 w-px bg-border" />
						<span className="mt-1 text-base font-bold leading-none">
							{endTime}
						</span>
					</div>
				</div>

				<ArtistPhoto
					src={event.image}
					alt={event.artist}
					className={cn("size-14 rounded-lg", isPast && "opacity-60 grayscale")}
				/>

				<div className="min-w-0 flex-1 space-y-1">
					<div className="font-semibold leading-tight">{event.artist}</div>
					<p className="text-sm text-muted-foreground">{event.scene}</p>
					{friendsWhoLike.length > 0 ? (
						<FriendLikesIndicator friends={friendsWhoLike} size="sm" />
					) : null}
				</div>
			</div>

			<div
				className={cn(
					"absolute top-3 right-3 size-2 rounded-full",
					isPast && "opacity-40",
				)}
				style={{ backgroundColor: color }}
			/>
		</article>
	);
}

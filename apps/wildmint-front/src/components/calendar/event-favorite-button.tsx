import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFavoritesStore, useIsFavorite } from "@/stores/favorites-store";
import { cn } from "@/lib/utils";

type EventFavoriteButtonProps = {
	eventId: string;
	className?: string;
};

export function EventFavoriteButton({
	eventId,
	className,
}: EventFavoriteButtonProps) {
	const isFavorite = useIsFavorite(eventId);
	const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className={cn(
				"size-7 shrink-0 text-muted-foreground hover:text-foreground",
				isFavorite && "text-red-500 hover:text-red-600",
				className,
			)}
			aria-label={isFavorite ? "Убрать из любимых" : "Добавить в любимые"}
			aria-pressed={isFavorite}
			onClick={(event) => {
				event.stopPropagation();
				toggleFavorite(eventId);
			}}
		>
			<Heart className={cn("size-5", isFavorite && "fill-current")} />
		</Button>
	);
}

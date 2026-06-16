import { Link } from "@tanstack/react-router";
import { Calendar, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FavoritesEmptyState() {
	return (
		<div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-10 text-center">
			<div className="flex size-14 items-center justify-center rounded-full bg-muted">
				<Heart className="size-7 text-muted-foreground" />
			</div>
			<div className="space-y-1">
				<p className="font-medium">Пока нет избранных концертов</p>
				<p className="text-sm text-muted-foreground">
					Перейди в календарь и отметь сердечком желаемых артистов — они
					появятся здесь по дням фестиваля.
				</p>
			</div>
			<Button asChild>
				<Link to="/calendar">
					<Calendar />
					Открыть календарь
				</Link>
			</Button>
		</div>
	);
}

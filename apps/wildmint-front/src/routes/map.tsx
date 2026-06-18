import { createFileRoute } from "@tanstack/react-router";

import { FestivalMap } from "@/components/map/festival-map";

export const Route = createFileRoute("/map")({ component: MapPage });

function MapPage() {
	return (
		<div className="h-full">
			<FestivalMap />
		</div>
	);
}

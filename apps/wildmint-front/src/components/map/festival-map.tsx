import { Minus, Plus } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { Button } from "@/components/ui/button";

const MAP_SRC = "/img/map.webp";
const INITIAL_SCALE = 0.9;
const ZOOM_STEP = 0.35;

export function FestivalMap() {
	return (
		<div className="relative h-full w-full overflow-hidden bg-muted">
			<TransformWrapper
				initialScale={INITIAL_SCALE}
				minScale={0.6}
				maxScale={6}
				centerOnInit
				limitToBounds={false}
				smooth={false}
				doubleClick={{ mode: "zoomIn", step: 0.5 }}
				pinch={{ step: 5 }}
				wheel={{ step: 0.2 }}
				trackPadPanning={{ disabled: false }}
			>
				{({ zoomIn, zoomOut }) => (
					<>
						<div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
							<Button
								type="button"
								variant="secondary"
								size="icon"
								className="size-9 bg-background/90 shadow-sm"
								onClick={() => zoomIn(ZOOM_STEP)}
								aria-label="Приблизить"
							>
								<Plus className="size-4" />
							</Button>
							<Button
								type="button"
								variant="secondary"
								size="icon"
								className="size-9 bg-background/90 shadow-sm"
								onClick={() => zoomOut(ZOOM_STEP)}
								aria-label="Отдалить"
							>
								<Minus className="size-4" />
							</Button>
						</div>
						<TransformComponent
							wrapperClass="!size-full touch-none"
							contentClass="!size-full flex items-center justify-center"
						>
							<img
								src={MAP_SRC}
								alt="Карта фестиваля"
								className="h-auto w-full max-w-none select-none"
								draggable={false}
							/>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
		</div>
	);
}

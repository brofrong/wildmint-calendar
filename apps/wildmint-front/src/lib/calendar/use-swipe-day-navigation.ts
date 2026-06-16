import { type RefObject, useEffect, useRef } from "react";

import { getAdjacentAvailableDate } from "@/lib/calendar/filter-events";

const SWIPE_THRESHOLD_PX = 50;
const SCROLL_TOLERANCE_PX = 10;

type UseSwipeDayNavigationOptions = {
	containerRef: RefObject<HTMLElement | null>;
	scrollRef: RefObject<HTMLElement | null>;
	selectedDate: string;
	availableDates: string[];
	onDateChange: (date: string) => void;
};

export function useSwipeDayNavigation({
	containerRef,
	scrollRef,
	selectedDate,
	availableDates,
	onDateChange,
}: UseSwipeDayNavigationOptions) {
	const touchStart = useRef<{
		x: number;
		y: number;
		scrollLeft: number;
	} | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const onTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			if (!touch) {
				return;
			}

			touchStart.current = {
				x: touch.clientX,
				y: touch.clientY,
				scrollLeft: scrollRef.current?.scrollLeft ?? 0,
			};
		};

		const onTouchEnd = (event: TouchEvent) => {
			if (!touchStart.current) {
				return;
			}

			const touch = event.changedTouches[0];
			if (!touch) {
				touchStart.current = null;
				return;
			}

			const dx = touch.clientX - touchStart.current.x;
			const dy = touch.clientY - touchStart.current.y;
			const scrollDelta = Math.abs(
				(scrollRef.current?.scrollLeft ?? 0) - touchStart.current.scrollLeft,
			);

			touchStart.current = null;

			if (
				Math.abs(dx) < SWIPE_THRESHOLD_PX ||
				Math.abs(dx) < Math.abs(dy) ||
				scrollDelta > SCROLL_TOLERANCE_PX
			) {
				return;
			}

			const direction = dx < 0 ? 1 : -1;
			const nextDate = getAdjacentAvailableDate(
				availableDates,
				selectedDate,
				direction,
			);

			if (nextDate) {
				onDateChange(nextDate);
			}
		};

		container.addEventListener("touchstart", onTouchStart, { passive: true });
		container.addEventListener("touchend", onTouchEnd, { passive: true });

		return () => {
			container.removeEventListener("touchstart", onTouchStart);
			container.removeEventListener("touchend", onTouchEnd);
		};
	}, [
		availableDates,
		containerRef,
		onDateChange,
		scrollRef,
		selectedDate,
	]);
}

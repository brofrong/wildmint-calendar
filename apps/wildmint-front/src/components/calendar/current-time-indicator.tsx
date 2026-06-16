type CurrentTimeIndicatorProps = {
	top: number;
};

export function CurrentTimeIndicator({ top }: CurrentTimeIndicatorProps) {
	return (
		<div
			className="pointer-events-none absolute inset-x-0 z-30"
			style={{ top }}
		>
			<div className="relative">
				<div className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-red-500" />
				<div className="border-t-2 border-red-500" />
			</div>
		</div>
	);
}

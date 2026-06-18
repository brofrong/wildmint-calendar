import type { SVGProps } from "react";

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			role="img"
			aria-label="Telegram"
			{...props}
		>
			<path d="M22.264 4.655a1.2 1.2 0 0 0-1.243-.082L2.908 11.352a1.2 1.2 0 0 0 .09 2.244l4.624 1.62 1.78 5.38a1.2 1.2 0 0 0 1.91.45l2.55-2.47 4.73 3.48a1.2 1.2 0 0 0 1.88-.77l2.8-16.53a1.2 1.2 0 0 0-.966-1.38ZM8.58 13.84l9.45-5.78-7.2 6.22-.28 3.04-1.97-3.48Z" />
		</svg>
	);
}

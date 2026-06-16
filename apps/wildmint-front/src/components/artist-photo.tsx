import { cn } from "@/lib/utils";

type ArtistPhotoProps = {
	src?: string;
	alt: string;
	className?: string;
};

export function ArtistPhoto({ src, alt, className }: ArtistPhotoProps) {
	if (!src) {
		return null;
	}

	return (
		<img
			src={src}
			alt={alt}
			loading="lazy"
			className={cn("shrink-0 rounded object-cover", className)}
		/>
	);
}

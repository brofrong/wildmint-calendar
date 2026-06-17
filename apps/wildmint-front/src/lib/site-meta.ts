export const SITE_ORIGIN = "https://wildmint.brofrong.ru";

export const SITE_TITLE = "Дикая Мята — календарь фестиваля";

export const SITE_DESCRIPTION =
	"Расписание выступлений по сценам, карта площадки и избранные артисты фестиваля Дикая Мята 2026.";

export const OG_IMAGE_PATH = "/img/app-showcase.png";
export const OG_IMAGE_WIDTH = 736;
export const OG_IMAGE_HEIGHT = 682;

export function toAbsoluteUrl(path: string): string {
	return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildSiteHeadMeta() {
	const imageUrl = toAbsoluteUrl(OG_IMAGE_PATH);

	return [
		{ title: SITE_TITLE },
		{ name: "description", content: SITE_DESCRIPTION },
		{ property: "og:title", content: SITE_TITLE },
		{ property: "og:description", content: SITE_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: SITE_ORIGIN },
		{ property: "og:image", content: imageUrl },
		{ property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
		{ property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
		{ property: "og:locale", content: "ru_RU" },
		{ property: "og:site_name", content: "Дикая Мята" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: SITE_TITLE },
		{ name: "twitter:description", content: SITE_DESCRIPTION },
		{ name: "twitter:image", content: imageUrl },
	] as const;
}

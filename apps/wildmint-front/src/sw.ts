/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

declare const self: ServiceWorkerGlobalScope;

const ONE_YEAR = 365 * 24 * 60 * 60;
const THIRTY_DAYS = 30 * 24 * 60 * 60;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("message", (event) => {
	if (event.data?.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

const pageStrategy = new NetworkFirst({
	cacheName: "pages-cache",
	networkTimeoutSeconds: 3,
	plugins: [
		new ExpirationPlugin({
			maxEntries: 64,
			maxAgeSeconds: THIRTY_DAYS,
		}),
	],
});

registerRoute(
	({ request }) => request.mode === "navigate",
	async ({ event, request }) => {
		try {
			return await pageStrategy.handle({ event, request });
		} catch {
			const cache = await caches.open("pages-cache");
			const cached =
				(await cache.match(request)) ?? (await cache.match("/"));
			if (cached) return cached;
			return Response.error();
		}
	},
);

registerRoute(
	({ url }) =>
		url.pathname.startsWith("/musician/") ||
		url.pathname.startsWith("/img/"),
	new CacheFirst({
		cacheName: "festival-images",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 300,
				maxAgeSeconds: ONE_YEAR,
				purgeOnQuotaError: false,
			}),
		],
	}),
);

registerRoute(
	({ request }) => request.destination === "image",
	new CacheFirst({
		cacheName: "images-cache",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 300,
				maxAgeSeconds: ONE_YEAR,
				purgeOnQuotaError: false,
			}),
		],
	}),
);

registerRoute(
	({ request }) =>
		request.destination === "style" ||
		request.destination === "script" ||
		request.destination === "font",
	new CacheFirst({
		cacheName: "static-assets",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 128,
				maxAgeSeconds: ONE_YEAR,
			}),
		],
	}),
);

/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
	new NavigationRoute(
		new NetworkFirst({
			cacheName: "pages-cache",
			networkTimeoutSeconds: 3,
			plugins: [
				new ExpirationPlugin({
					maxEntries: 32,
					maxAgeSeconds: 24 * 60 * 60,
				}),
			],
		}),
	),
);

registerRoute(
	({ request }) => request.destination === "image",
	new CacheFirst({
		cacheName: "images-cache",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 200,
				maxAgeSeconds: 30 * 24 * 60 * 60,
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
				maxEntries: 64,
				maxAgeSeconds: 7 * 24 * 60 * 60,
			}),
		],
	}),
);

import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { injectManifest } from "workbox-build";

const rootDir = resolve(import.meta.dirname, "..");
const distClient = resolve(rootDir, "dist/client");
const srcSw = resolve(rootDir, "src/sw.ts");

async function generateServiceWorker() {
	if (!existsSync(distClient)) {
		console.error("dist/client not found — run vite build first");
		process.exit(1);
	}

	console.log("Transpiling service worker...");
	const transpiled = await Bun.build({
		entrypoints: [srcSw],
		format: "esm",
		target: "browser",
		minify: true,
	});

	if (!transpiled.success) {
		console.error("Failed to transpile service worker:", transpiled.logs);
		process.exit(1);
	}

	const tempSwPath = resolve(distClient, "sw-src.js");
	writeFileSync(tempSwPath, await transpiled.outputs[0].text());

	console.log("Injecting precache manifest...");
	try {
		const { count, size, warnings } = await injectManifest({
			swSrc: tempSwPath,
			swDest: resolve(distClient, "sw.js"),
			globDirectory: distClient,
			globPatterns: [
				"**/*.{js,css,woff2}",
				"favicon.ico",
				"logo192.png",
				"logo512.png",
				"manifest.webmanifest",
				"img/**/*.{webp,png,jpg,jpeg}",
			],
			globIgnores: ["sw-src.js", "sw.js", "musician/**"],
			maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
		});

		unlinkSync(tempSwPath);

		if (warnings.length > 0) {
			console.warn("Warnings:\n", warnings.join("\n"));
		}

		console.log(
			`Service worker generated: ${count} files, ${(size / 1024).toFixed(1)} KB`,
		);
	} catch (error) {
		console.error("Failed to generate service worker:", error);
		process.exit(1);
	}
}

await generateServiceWorker();

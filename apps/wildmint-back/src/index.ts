import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { runMigrations } from "./db/migrate"

runMigrations()

const SERVER_PORT = Number(process.env.PORT ?? 3000)

function resolvePaths() {
	if (process.env.CLIENT_DIRECTORY && process.env.SERVER_ENTRY_POINT) {
		return {
			clientDirectory: process.env.CLIENT_DIRECTORY,
			serverEntryPoint: process.env.SERVER_ENTRY_POINT,
		}
	}

	const cwdClient = resolve(process.cwd(), "dist/client")
	if (existsSync(cwdClient)) {
		return {
			clientDirectory: cwdClient,
			serverEntryPoint: resolve(process.cwd(), "dist/server/server.js"),
		}
	}

	return {
		clientDirectory: resolve(import.meta.dir, "../../wildmint-front/dist/client"),
		serverEntryPoint: resolve(
			import.meta.dir,
			"../../wildmint-front/dist/server/server.js",
		),
	}
}

const { clientDirectory, serverEntryPoint } = resolvePaths()

const { default: handler } = (await import(serverEntryPoint)) as {
	default: { fetch: (request: Request) => Response | Promise<Response> }
}

const server = Bun.serve({
	hostname: "0.0.0.0",
	port: SERVER_PORT,
	async fetch(req) {
		const { pathname } = new URL(req.url)

		if (pathname !== "/") {
			const file = Bun.file(`${clientDirectory}${pathname}`)
			if (await file.exists()) {
				const headers = new Headers()
				if (
					pathname.startsWith("/musician/") ||
					pathname.startsWith("/img/") ||
					pathname.startsWith("/assets/") ||
					/\.(webp|png|jpe?g|ico|woff2|js|css)$/i.test(pathname)
				) {
					headers.set(
						"Cache-Control",
						"public, max-age=31536000, immutable",
					)
				}
				return new Response(file, { headers })
			}
		}

		return handler.fetch(req)
	},
})

console.log(`Server listening on http://0.0.0.0:${server.port}`)

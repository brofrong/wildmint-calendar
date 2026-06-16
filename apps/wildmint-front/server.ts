const SERVER_PORT = Number(process.env.PORT ?? 3000)
const CLIENT_DIRECTORY = "./dist/client"
const SERVER_ENTRY_POINT = "./dist/server/server.js"

const { default: handler } = (await import(SERVER_ENTRY_POINT)) as {
	default: { fetch: (request: Request) => Response | Promise<Response> }
}

const server = Bun.serve({
	hostname: "0.0.0.0",
	port: SERVER_PORT,
	async fetch(req) {
		const { pathname } = new URL(req.url)

		if (pathname !== "/") {
			const file = Bun.file(`${CLIENT_DIRECTORY}${pathname}`)
			if (await file.exists()) {
				return new Response(file)
			}
		}

		return handler.fetch(req)
	},
})

console.log(`Server listening on http://0.0.0.0:${server.port}`)

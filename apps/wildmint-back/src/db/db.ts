import { mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { Database } from "bun:sqlite"
import { env } from "../utils/env"
import { relations } from "./relations"

mkdirSync(dirname(resolve(env.DB_FILE_NAME)), { recursive: true })

const sqlite = new Database(env.DB_FILE_NAME)
export const db = drizzle({ client: sqlite, relations })

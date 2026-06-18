import { resolve } from "node:path"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import { db } from "./db"

const MIGRATIONS_FOLDER = resolve(import.meta.dir, "../../drizzle")

export function runMigrations() {
	console.log("Начинаем миграцию базы данных...")
	migrate(db, { migrationsFolder: MIGRATIONS_FOLDER })
	console.log("Миграция выполнена успешно")
}

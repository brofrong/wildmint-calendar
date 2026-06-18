import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3002),
  DB_FILE_NAME: z.string().default("./db/wildmint.sqlite"),
})

export const env = envSchema.parse(process.env);

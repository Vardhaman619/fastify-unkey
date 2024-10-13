import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { users, facts } from "./schema";
import { env } from "../env";

// Initialize Drizzle with Turso DB
const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});
export const db = drizzle(client, { schema: { users, facts } });

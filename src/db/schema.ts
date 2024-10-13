import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  name: text("name"),
  email: text("email").unique(),
  apiId: text("apiId").notNull().unique(),
  apiKey: text("apiKey").primaryKey(),
});

export const facts = sqliteTable("facts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.apiKey, {
      onDelete: "cascade",
    }),
  fact: text("fact").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_DATE)`)
    .notNull(),
});

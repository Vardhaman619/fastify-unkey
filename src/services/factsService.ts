import { db } from "../db";
import { facts, users } from "../db/schema";
import { eq, and, between } from "drizzle-orm";
import { generateFactFromAI } from "./aiService";

export const addFact = async (apiKey: string) => {
  const fact = await generateFactFromAI();
  const user = await db
    .select({ apiKey: users.apiKey })
    .from(users)
    .where(eq(users.apiKey, apiKey));
  await db.insert(facts).values({
    userId: user[0].apiKey,
    fact,
  });

  return fact;
};

export const getFactsForToday = async (apiKey: string) => {
  const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
  const factRows = await db
    .select({
      fact: facts.fact,
      createdAt: facts.createdAt,
    })
    .from(facts)
    .innerJoin(users, eq(facts.userId, users.apiKey)) // Properly join the `users` table on `apiKey`
    .where(and(eq(users.apiKey, apiKey), eq(facts.createdAt, today)));
  return factRows;
};

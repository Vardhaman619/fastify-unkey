import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import unkeyClient from "../lib/unkey";
import { env } from "../env";

export const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const key = await unkeyClient.keys.create({
    apiId: env.UNKEY_API_ID,
  });
  if (key.result === undefined || key.error) {
    return [null, "Error generating API key"];
  }
  try {
    await db.insert(users).values({
      apiId: key.result.keyId,
      apiKey: key.result.key,
      name,
      email,
    });
    return [key.result.key, null];
  } catch (error) {
    unkeyClient.keys.delete({ keyId: key.result.keyId });
    return [null, "Error creating user"];
  }
};

export const deleteUser = async (apiKey: string) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.apiKey, apiKey))
    .returning({ apiId: users.apiId });
  await unkeyClient.apis.delete({ apiId: deletedUser[0].apiId });
};

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string(),
    UNKEY_API_KEY: z.string(),
    TURSO_DATABASE_URL: z.string(),
    UNKEY_API_ID: z.string(),
    TURSO_AUTH_TOKEN: z.string(),
    SERVER_PORT: z.string().transform((val) => {
      const parsed = Number(val);
      if (Number.isNaN(parsed)) {
        throw new Error("Invalid SERVER_PORT Value");
      }
      return parsed;
    }),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UNKEY_API_KEY: process.env.UNKEY_API_KEY,
    UNKEY_API_ID: process.env.UNKEY_API_ID,
    SERVER_PORT: process.env.SERVER_PORT,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  },
});

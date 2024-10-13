import type { onRequestMetaHookHandler } from "fastify/types/hooks";
import unkeyClient from "../lib/unkey";

export const rateLimiterMiddleware: onRequestMetaHookHandler = async (
  request,
  reply
) => {
  try {
    if (request.url !== "/fact" || request.method !== "GET") return;
    const apiKey = request.headers.authorization;
    if (!apiKey) {
      return reply.status(400).send({ error: "API key is required" });
    }
    // Rate limiting with Unkey
    const rateLimitResult = await unkeyClient.ratelimits.limit({
      duration: 86400, // 1 day in seconds
      identifier: apiKey as string, // Use the API key as identifier
      limit: 10, // Limit to 10 requests per day
      namespace: "facts",
      cost: 1,
    });
    console.log({ rateLimitResult });

    if (rateLimitResult.error || rateLimitResult.result.remaining <= 0) {
      return reply
        .status(429)
        .send({ error: "Rate limit exceeded. Try again tomorrow." });
    }

    // Continue if rate limit check passed
    return;
  } catch (error) {
    return reply.status(500).send({ error: "Rate limiting error" });
  }
};

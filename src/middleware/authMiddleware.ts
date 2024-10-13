import type {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
  onRequestAsyncHookHandler,
} from "fastify";
import unkeyClient from "../lib/unkey";
import { verifyKey } from "@unkey/api";
import type { onRequestMetaHookHandler } from "fastify/types/hooks";

export const authMiddleware: onRequestMetaHookHandler = async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ error: "Unauthorized: No API Key provided" });
  }

  const apiKey = authorizationHeader.replace("Bearer ", "");

  // Verify API key using Unkey SDK
  try {
    const result = await unkeyClient.keys.verify({ key: apiKey });
    // Attach the API key or user info to the request object
    req.apiKey = apiKey;
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized: Invalid API Key" });
  }
};

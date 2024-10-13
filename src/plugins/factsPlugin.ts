import type { FastifyPluginCallback } from "fastify";
import { generateFact, getAllFacts } from "../controllers/factsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { rateLimiterMiddleware } from "../middleware/rateLimitMiddleware";

const factsPlugin: FastifyPluginCallback = (app, opts, done) => {
  // Apply middleware only to fact-related routes
  app.addHook("onRequest", authMiddleware);
  app.addHook("onRequest", rateLimiterMiddleware);
  app.get("/fact", generateFact);
  app.get("/facts", getAllFacts);
  done();
};

export default factsPlugin;

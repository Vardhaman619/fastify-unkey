import type { FastifyRequest, FastifyReply, RouteHandlerMethod } from "fastify";
import { addFact, getFactsForToday } from "../services/factsService";
export const generateFact: RouteHandlerMethod = async (req, res) => {
  const fact = await addFact(req.apiKey as string);
  res.send({ fact });
};

export const getAllFacts: RouteHandlerMethod = async (req, res) => {
  const facts = await getFactsForToday(req.apiKey as string);
  res.send(facts.length ? facts : { message: "No facts generated today" });
};

import { generateText } from "ai";
import { AI } from "../lib/ai";

export const generateFactFromAI = async () => {
  const fact = await generateText({
    model: AI,
    system:
      "You are an AI that specializes in generating fascinating facts. Provide one unique, concise, and accurate fact about any topic like science, technology, history, nature, or general trivia. The fact should be interesting and relatively unknown to most people. Avoid common facts.",
    prompt: "Please generate only one fact.",
  });
  return fact.text;
};

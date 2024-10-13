import type { RouteHandlerMethod } from "fastify";
import { createUser, deleteUser } from "../services/authService";
import { z } from "zod";
const UserCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
export const signup: RouteHandlerMethod = async (req, res) => {
  const user = UserCreateSchema.safeParse(req.body);
  if (!user.success) {
    return res.send({ error: "Invalid user data" });
  }
  const [apiKey, error] = await createUser(user.data);
  if (error != null) {
    return res.send({ error: error || error });
  }
  res.send({ apiKey });
};

export const signout: RouteHandlerMethod = async (req, res) => {
  const apiKey = req.headers.authorization;
  if (apiKey) await deleteUser(apiKey);
  res.send({ message: "Key revoked successfully" });
};

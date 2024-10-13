import type { FastifyPluginCallback } from "fastify";
import { signout, signup } from "../controllers/authController";

const authPlugin: FastifyPluginCallback = (app, opts, done) => {
  app.post("/signup", signup);
  app.post("/signout", signout);
  done();
};

export default authPlugin;

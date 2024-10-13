import Fastify from "fastify";
import { env } from "./env";
import authPlugin from "./plugins/authPlugin";
import factsPlugin from "./plugins/factsPlugin";

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  try {
    fastify.register(authPlugin);
    fastify.register(factsPlugin);
    await fastify.listen({ port: env.SERVER_PORT });
    fastify.log.info(`Server listening on port ${env.SERVER_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
// Start the server
start();

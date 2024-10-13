import { Unkey } from "@unkey/api";
import { env } from "../env";

// Initialize Unkey
const unkeyClient = new Unkey({
  rootKey: env.UNKEY_API_KEY,
});

export default unkeyClient;

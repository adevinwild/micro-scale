import "server-only";
import Replicate from "replicate";

const _instance = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default _instance;

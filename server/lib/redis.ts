import "dotenv/config";
import { createClient } from "redis";

const url = process.env.REDIS_URL;

if (url === undefined || url === "") {
  throw new Error("REDIS_URL is undefined");
}

export const redis = createClient({ url });

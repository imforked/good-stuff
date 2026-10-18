import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (connectionString === undefined) {
  throw new Error("DATABASE_URL is undefined");
}

export const prisma = new PrismaClient({
  adapter: new PrismaPg(connectionString),
});

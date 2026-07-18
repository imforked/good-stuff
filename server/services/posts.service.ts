import { prisma } from "../lib/prisma";
import { createPostBodySchema } from "../schemas/posts";
import { z } from "zod";

type CreatePostBody = z.infer<typeof createPostBodySchema>;

export const createPostService = async (
  userId: string, // from Better Auth / session
  { title }: CreatePostBody // from the client
) => {
  return await prisma.post.create({ data: { userId, title } });
};

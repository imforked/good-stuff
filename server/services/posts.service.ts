import { prisma } from "../lib/prisma";
import { createPostBodySchema, updatePostParamsSchema } from "../schemas/posts";
import { z } from "zod";

type CreatePostBody = z.infer<typeof createPostBodySchema>;
type UpdatePostBody = z.infer<typeof updatePostParamsSchema>;

export const createPostService = async (
  userId: string, // from Better Auth / session
  { title }: CreatePostBody // from the client
) => {
  return await prisma.post.create({ data: { userId, title } });
};

export const getPostService = async (postId: string) => {
  return await prisma.post.findUnique({ where: { id: postId } });
};

export const updatePostService = async ({
  postId,
  title,
}: {
  postId: string;
  title: string;
}) => {
  return await prisma.post.update({ where: { id: postId }, data: { title } });
};
import { prisma } from "../lib/prisma";
import { z } from "zod";
import {
  createCommentBodySchema,
  createCommentParamsSchema,
} from "../schemas/comments";

type CreateCommentBody = z.infer<typeof createCommentBodySchema>;
type CreateCommentParams = z.infer<typeof createCommentParamsSchema>;

export const createCommentService = async (
  userId: string,
  { postId }: CreateCommentParams,
  { text }: CreateCommentBody
) => {
  return await prisma.comment.create({
    data: {
      text,
      userId,
      postId,
    },
  });
};

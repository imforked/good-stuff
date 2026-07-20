import { prisma } from "../lib/prisma";
import { z } from "zod";
import {
  createCommentBodySchema,
  createCommentParamsSchema,
  getCommentParamsSchema,
  updateCommentBodySchema,
  updateCommentParamsSchema,
  deleteCommentParamsSchema,
} from "../schemas/comments";

type CreateCommentBody = z.infer<typeof createCommentBodySchema>;
type CreateCommentParams = z.infer<typeof createCommentParamsSchema>;
type GetCommentParams = z.infer<typeof getCommentParamsSchema>;
type UpdateCommentBody = z.infer<typeof updateCommentBodySchema>;
type UpdateCommentParams = z.infer<typeof updateCommentParamsSchema>;
type DeleteCommentParams = z.infer<typeof deleteCommentParamsSchema>;

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

export const getCommentService = async ({ commentId }: GetCommentParams) => {
  return await prisma.comment.findUnique({ where: { id: commentId } });
};

export const updateCommentService = async (
  { commentId }: UpdateCommentParams,
  { text }: UpdateCommentBody
) => {
  return await prisma.comment.update({
    where: { id: commentId },
    data: { text },
  });
};

export const deleteCommentService = async ({
  commentId,
}: DeleteCommentParams) => {
  return await prisma.comment.delete({ where: { id: commentId } });
};

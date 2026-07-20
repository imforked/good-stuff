import { z } from "zod";
import { COMMENT_MAX_CHAR } from "../../shared/constants";
import { postId } from "./posts";

const text = z
  .string()
  .trim()
  .min(1, "Comment must be at least 1 character.")
  .max(COMMENT_MAX_CHAR, `Comment can be max ${COMMENT_MAX_CHAR} characters.`);

const commentId = z.string().trim().min(1);

export const createCommentBodySchema = z.object({
  text,
});

export const createCommentParamsSchema = z.object({
  postId,
});

export const getCommentParamsSchema = z.object({
  commentId,
});

export const updateCommentBodySchema = z.object({
  text,
});

export const updateCommentParamsSchema = z.object({
  commentId,
});

export const deleteCommentParamsSchema = z.object({
  commentId,
});

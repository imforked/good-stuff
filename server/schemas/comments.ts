import { z } from "zod";
import { COMMENT_MAX_CHAR } from "../../shared/constants";
import { postId } from "./posts";

export const createCommentBodySchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Comment must be at least 1 character.")
    .max(
      COMMENT_MAX_CHAR,
      `Comment can be max ${COMMENT_MAX_CHAR} characters.`
    ),
});

export const createCommentParamsSchema = z.object({
  postId,
});

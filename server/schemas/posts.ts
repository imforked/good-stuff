import { z } from "zod";
import { POST_TITLE_MAX_CHAR } from "../../shared/constants";

const title = z
  .string()
  .trim()
  .min(1, "Post title must be at least 1 character.")
  .max(
    POST_TITLE_MAX_CHAR,
    `Post title can be a max of ${POST_TITLE_MAX_CHAR} characters.`
  );

export const postId = z.string().trim().min(1);

export const createPostBodySchema = z.object({
  title,
});

export const getPostParamsSchema = z.object({
  postId,
});

export const updatePostParamsSchema = z.object({
  postId,
});

export const updatePostBodySchema = z.object({
  title,
});

export const deletePostParamsSchema = z.object({
  postId,
});

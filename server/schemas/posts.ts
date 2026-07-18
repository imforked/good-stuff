import { z } from "zod";
import { POST_TITLE_MAX_CHAR } from "../../shared/constants";

export const createPostBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Post title must be at least 1 character.")
    .max(
      POST_TITLE_MAX_CHAR,
      `Post title can be a max of ${POST_TITLE_MAX_CHAR} characters.`
    ),
});

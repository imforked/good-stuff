import { z } from "zod";
import { LIST_TITLE_MAX_CHAR } from "../../shared/constants.js";

const listId = z.string();

export const createListBodySchema = z.object({
  title: z.string().trim().min(1).max(LIST_TITLE_MAX_CHAR),
});

export const getListParamsSchema = z.object({
  listId,
});

export const addPostToUserListParamsSchema = z.object({
  listId,
  postId: z.string(),
});

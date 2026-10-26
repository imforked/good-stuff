import { z } from "zod";
import { LIST_TITLE_MAX_CHAR } from "../../shared/constants.js";

export const getListParamsSchema = z.object({
  listId: z.string().trim().min(1).max(LIST_TITLE_MAX_CHAR),
});

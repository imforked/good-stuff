import { z } from "zod";
import { GROUP_TITLE_MAX_CHAR } from "../../shared/constants.js";

export const createGroupBodySchema = z.object({
  title: z.string().trim().min(1).max(GROUP_TITLE_MAX_CHAR),
});

export const getGroupParamsSchema = z.object({
  groupId: z.string(),
});

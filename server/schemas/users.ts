import { z } from "zod";
import { DISPLAY_NAME_MAX_CHAR } from "../../shared/constants";

export const createAccountBodySchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Display name must be at least 1 character")
    .max(
      DISPLAY_NAME_MAX_CHAR,
      `Display name can have a max of ${DISPLAY_NAME_MAX_CHAR} characters.`
    ),
  pfpS3Url: z.url({ error: "pfpS3Url must be a URL." }),
});

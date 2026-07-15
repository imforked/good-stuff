import { z } from "zod";
import { DISPLAY_NAME_MAX_CHAR } from "../../shared/constants";

const displayName = z
  .string()
  .trim()
  .min(1, "Display name must be at least 1 character")
  .max(
    DISPLAY_NAME_MAX_CHAR,
    `Display name can have a max of ${DISPLAY_NAME_MAX_CHAR} characters.`
  );

const pfpS3Url = z.url({ error: "pfpS3Url must be a URL." });

export const createAccountBodySchema = z.object({
  displayName,
  pfpS3Url,
});

export const updateProfileBodySchema = z
  .object({
    displayName,
    pfpS3Url,
  })
  .partial()
  .refine(
    (data) => data.displayName !== undefined || data.pfpS3Url !== undefined,
    { error: "Must provide displayName and/or pfpS3Url." }
  );

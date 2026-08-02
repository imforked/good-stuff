import { z } from "zod";
import {
  POST_TITLE_MAX_CHAR,
  POST_LONG_DESCRIPTION_MAX_CHAR,
  POST_SHORT_DESCRIPTION_MAX_CHAR,
  POST_TYPES,
  POST_LOCATIONS,
} from "../../shared/constants";

const title = z
  .string()
  .trim()
  .min(1, "Title must be at least 1 character.")
  .max(
    POST_TITLE_MAX_CHAR,
    `Title can be a max of ${POST_TITLE_MAX_CHAR} characters.`
  );

const shortDescription = z
  .string()
  .trim()
  .min(1, "Short description must be at least 1 character.")
  .max(
    POST_SHORT_DESCRIPTION_MAX_CHAR,
    `Short description can be a max of ${POST_SHORT_DESCRIPTION_MAX_CHAR} characters.`
  );

const longDescription = z
  .string()
  .trim()
  .min(1, "Long description must be at least 1 character.")
  .max(
    POST_LONG_DESCRIPTION_MAX_CHAR,
    `Long description can be a max of ${POST_LONG_DESCRIPTION_MAX_CHAR} characters.`
  );

const type = z.enum(POST_TYPES);

const location = z.enum(POST_LOCATIONS);

const heroImgS3Url = z
  .string()
  .min(1, "Hero image S3 URL must be at least 1 character.");

export const postId = z.string().trim().min(1);

export const createPostBodySchema = z.object({
  heroImgS3Url,
  title,
  shortDescription,
  longDescription,
  type,
  location,
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

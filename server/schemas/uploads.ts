import { z } from "zod";
import { CONTENT_TYPE_WHITE_LIST } from "../constants/contentTypeWhiteList.js";

export const contentType = z.enum(CONTENT_TYPE_WHITE_LIST);
export const putImageBodySchema = z.object({ contentType });

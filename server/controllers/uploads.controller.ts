import { requireSession } from "../lib/requireSession.js";
import { createPresignedUpload } from "../lib/createPresignedUpload.js";
import { Request, Response } from "express";
import { createUploadBodySchema } from "../schemas/uploads.js";
import { ERROR } from "../constants/error.js";

export const createUpload = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = createUploadBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const upload = await createPresignedUpload(
    session.user.id,
    parsed.data.contentType,
  );

  return res.status(200).json(upload);
};

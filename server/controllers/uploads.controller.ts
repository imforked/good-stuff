import { requireSession } from "../lib/requireSession.js";
import { createPresignedUpload } from "../lib/createPresignedUpload.js";
import { Request, Response } from "express";
import { putImageBodySchema } from "../schemas/uploads.js";
import { ERROR } from "../constants.js";

export const putImage = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = putImageBodySchema.safeParse(req.body);

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

  if (!upload) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
    });
  }

  return res.status(200).json(upload);
};

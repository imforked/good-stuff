import { Request, Response } from "express";
import { requireSession } from "../lib/requireSession.js";
import { ERROR } from "../constants/error.js";
import { createGroupService } from "../services/groups.service.js";
import { createGroupBodySchema } from "../schemas/groups.js";

export const createGroupController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = createGroupBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const group = await createGroupService({
    title: parsed.data.title,
    userId: session.user.id,
  });

  return res.status(201).json(group);
};

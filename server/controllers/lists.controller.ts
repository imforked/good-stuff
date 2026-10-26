import { Request, Response } from "express";
import { getListParamsSchema, createListBodySchema } from "../schemas/lists.js";
import { requireSession } from "../lib/requireSession.js";
import {
  getListService,
  createListService,
} from "../services/lists.service.js";
import { ERROR } from "../constants.js";

export const createListController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
    });
  }

  const parsed = createListBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const list = createListService(session.user.id, parsed.data?.title);

  return res.status(200).json(list);
};

export const getListController = async (req: Request, res: Response) => {
  const session = requireSession(req, res);

  if (!session) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
    });
  }

  const parsed = getListParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const lists = await getListService(parsed.data.listId);

  if (!lists) {
    return res.status(404).send({
      error: ERROR.LISTS_NOT_FOUND,
    });
  }

  return res.status(200).json(lists);
};

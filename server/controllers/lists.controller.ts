import { Request, Response } from "express";
import { getListParamsSchema } from "../schemas/lists.js";
import { requireSession } from "../lib/requireSession.js";
import { getList } from "../services/lists.service.js";
import { ERROR } from "../constants.js";

export const createList = (req: Request, res: Response) => {
    
}

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

  const lists = await getList(parsed.data.listId);

  if (!lists) {
    return res.status(404).send({
      error: ERROR.LISTS_NOT_FOUND,
    });
  }

  return res.status(200).json(lists);
};

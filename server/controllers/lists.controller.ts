import { Request, Response } from "express";
import {
  getListParamsSchema,
  createListBodySchema,
  addPostToUserListParamsSchema,
} from "../schemas/lists.js";
import { requireSession } from "../lib/requireSession.js";
import {
  getListService,
  createListService,
  addPostToUserListService,
} from "../services/lists.service.js";
import { ERROR } from "../constants.js";
import { getPostService } from "../services/posts.service.js";

export const createListController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = createListBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const list = await createListService(session.user.id, parsed.data.title);

  return res.status(201).json(list);
};

export const getListController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = getListParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const list = await getListService(parsed.data.listId);

  if (!list) {
    return res.status(404).send({
      error: ERROR.LISTS_NOT_FOUND,
    });
  }

  if (list.userId !== session.user.id) {
    return res.status(403).json({
      error: ERROR.FORBIDDEN,
    });
  }

  return res.status(200).json(list);
};

export const addPostToUserListController = async (
  req: Request,
  res: Response,
) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = addPostToUserListParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const list = await getListService(parsed.data.listId);

  if (!list) {
    return res.status(404).send({
      error: ERROR.LISTS_NOT_FOUND,
    });
  }

  if (list.userId !== session.user.id) {
    return res.status(403).json({
      error: ERROR.FORBIDDEN,
    });
  }

  const post = await getPostService(parsed.data.postId);

  if (!post) {
    return res.status(404).send({
      error: ERROR.POST_NOT_FOUND,
    });
  }

  const updatedList = await addPostToUserListService(
    parsed.data.listId,
    parsed.data.postId,
  );

  return res.status(200).json(updatedList);
};

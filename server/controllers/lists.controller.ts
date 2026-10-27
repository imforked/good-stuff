import { Request, Response } from "express";
import {
  getUserListParamsSchema,
  createUserListBodySchema,
  addPostToUserListParamsSchema,
  deletePostFromUserListParamsSchema,
} from "../schemas/lists.js";
import { requireSession } from "../lib/requireSession.js";
import {
  getUserListService,
  createUserListService,
  deleteUserListService,
  addPostToUserListService,
  deletePostFromUserListService,
} from "../services/lists.service.js";
import { ERROR } from "../constants.js";
import { getPostService } from "../services/posts.service.js";

export const createUserListController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = createUserListBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const list = await createUserListService(session.user.id, parsed.data.title);

  return res.status(201).json(list);
};

export const getUserListController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = getUserListParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const list = await getUserListService(parsed.data.listId);

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

export const deleteUserListController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = getUserListParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const list = await getUserListService(parsed.data.listId);

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

  await deleteUserListService(parsed.data.listId);

  return res.status(204).end();
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

  const list = await getUserListService(parsed.data.listId);

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

export const deletePostFromUserListController = async (
  req: Request,
  res: Response,
) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = deletePostFromUserListParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const list = await getUserListService(parsed.data.listId);

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

  const postIsOnList = list.posts.some((item) => item.id === post.id);

  if (!postIsOnList) {
    return res.status(404).json({
      error: ERROR.POST_NOT_ON_LIST,
    });
  }

  const updatedList = await deletePostFromUserListService(
    parsed.data.listId,
    parsed.data.postId,
  );

  return res.status(200).json(updatedList);
};

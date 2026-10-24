import { Request, Response } from "express";
import {
  bookmarkPostService,
  createPostService,
  deletePostService,
  getFeedPostService,
  getPostService,
  getPostsService,
  unBookmarkPostService,
  updatePostService,
} from "../services/posts.service.js";
import {
  createPostBodySchema,
  getPostParamsSchema,
  updatePostParamsSchema,
  updatePostBodySchema,
  deletePostParamsSchema,
  bookmarkPostParamsSchema,
  unBookmarkPostParamsSchema,
} from "../schemas/posts.js";
import { requireSession } from "../lib/requireSession.js";
import { ERROR } from "../constants.js";

export const createPost = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);
  if (!session) {
    return;
  }

  const parsed = createPostBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const post = await createPostService(session.user.id, parsed.data);

  return res.status(201).json(post);
};

export const getPost = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);
  if (!session) {
    return;
  }

  const parsed = getPostParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const post = await getFeedPostService(parsed.data.postId, session.user.id);

  if (!post) {
    return res.status(404).json({ error: ERROR.POST_NOT_FOUND });
  }

  return res.status(200).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const posts = await getPostsService(session.user.id);

  return res.status(200).json(posts);
};

export const updatePost = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);
  if (!session) {
    return;
  }

  const parsedParams = updatePostParamsSchema.safeParse(req.params);
  const parsedBody = updatePostBodySchema.safeParse(req.body);

  if (!parsedParams.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsedParams.error.flatten(),
    });
  }

  if (!parsedBody.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsedBody.error.flatten(),
    });
  }

  const post = await getPostService(parsedParams.data.postId);

  if (!post) {
    return res.status(404).json({ error: ERROR.POST_NOT_FOUND });
  }

  if (session.user.id !== post.userId) {
    return res.status(403).json({ error: ERROR.FORBIDDEN });
  }

  const updatedPost = await updatePostService({
    postId: parsedParams.data.postId,
    title: parsedBody.data.title,
  });

  if (!updatedPost) {
    return res.status(404).json({ error: ERROR.POST_NOT_FOUND });
  }

  return res.status(200).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);
  if (!session) {
    return;
  }

  const parsed = deletePostParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const post = await getPostService(parsed.data.postId);

  if (!post) {
    return res.status(404).json({ error: ERROR.POST_NOT_FOUND });
  }

  if (post.userId !== session.user.id) {
    return res.status(403).json({ error: ERROR.FORBIDDEN });
  }

  await deletePostService(parsed.data.postId);

  return res.status(204).end();
};

export const bookmarkPost = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = bookmarkPostParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const post = await getPostService(parsed.data.postId);

  if (!post) {
    return res.status(404).json({ error: ERROR.POST_NOT_FOUND });
  }

  if (post.userId === session.user.id) {
    return res.status(403).json({ error: ERROR.FORBIDDEN });
  }

  const bookmark = await bookmarkPostService(session.user.id, post.id);

  if (!bookmark) {
    return res.status(409).json({ error: ERROR.BOOKMARK_EXISTS });
  }

  return res.status(201).end();
};

export const unBookmarkPost = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = unBookmarkPostParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsed.error.flatten(),
    });
  }

  const bookmark = await unBookmarkPostService(
    session.user.id,
    parsed.data.postId,
  );

  if (!bookmark) {
    return res.status(404).json({
      error: ERROR.BOOKMARK_NOT_FOUND,
    });
  }

  return res.status(204).end();
};

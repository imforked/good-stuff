import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  getPostService,
  updatePostService,
} from "../services/posts.service";
import {
  createPostBodySchema,
  getPostParamsSchema,
  updatePostParamsSchema,
  updatePostBodySchema,
  deletePostParamsSchema,
} from "../schemas/posts";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export const createPost = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const parsed = createPostBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid body",
      details: parsed.error.flatten(),
    });
  }

  const post = await createPostService(session.user.id, {
    title: parsed.data.title,
  });

  return res.status(201).json(post);
};

export const getPost = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const parsed = getPostParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid params",
      details: parsed.error.flatten(),
    });
  }

  const post = await getPostService(parsed.data.postId);

  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }

  return res.status(200).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const parsedParams = updatePostParamsSchema.safeParse(req.params);
  const parsedBody = updatePostBodySchema.safeParse(req.body);

  if (!parsedParams.success) {
    return res
      .status(400)
      .json({ error: "invalid params", details: parsedParams.error.flatten() });
  }

  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ error: "invalid body", details: parsedBody.error.flatten() });
  }

  const post = await getPostService(parsedParams.data.postId);

  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }

  if (session.user.id !== post.userId) {
    return res.status(403).json({ error: "forbidden" });
  }

  const updatedPost = await updatePostService({
    postId: parsedParams.data.postId,
    title: parsedBody.data.title,
  });

  if (!updatedPost) {
    return res.status(404).json({ error: "post not found" });
  }

  return res.status(200).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const parsed = deletePostParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "invalid params", details: parsed.error.flatten() });
  }

  const post = await getPostService(parsed.data.postId);

  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }

  if (post.userId !== session.user.id) {
    return res.status(403).json({ error: "forbidden" });
  }

  await deletePostService(parsed.data.postId);

  return res.status(204).end();
};

import { Request, Response } from "express";
import { ERROR } from "../constants";
import {
  createCommentBodySchema,
  createCommentParamsSchema,
  updateCommentBodySchema,
  updateCommentParamsSchema,
} from "../schemas/comments";
import {
  createCommentService,
  getCommentService,
  updateCommentService,
} from "../services/comments.service";
import { getPostService } from "../services/posts.service";
import { requireSession } from "../lib/requireSession";

export const createComment = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);
  if (!session) {
    return;
  }

  const parsedBody = createCommentBodySchema.safeParse(req.body);
  const parsedParams = createCommentParamsSchema.safeParse(req.params);

  if (!parsedBody.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsedBody.error.flatten(),
    });
  }

  if (!parsedParams.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsedParams.error.flatten(),
    });
  }

  const post = await getPostService(parsedParams.data.postId);

  if (!post) {
    return res.status(404).json({ error: ERROR.POST_NOT_FOUND });
  }

  const comment = await createCommentService(
    session.user.id,
    parsedParams.data,
    parsedBody.data
  );

  return res.status(201).json(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsedCommentParams = updateCommentParamsSchema.safeParse(req.params);
  const parsedCommentBody = updateCommentBodySchema.safeParse(req.body);

  if (!parsedCommentParams.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsedCommentParams.error.flatten(),
    });
  }

  if (!parsedCommentBody.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsedCommentBody.error.flatten(),
    });
  }

  const comment = await getCommentService(parsedCommentParams.data);

  if (!comment) {
    return res.status(404).json({
      error: ERROR.COMMENT_NOT_FOUND,
    });
  }

  if (session.user.id !== comment.userId) {
    return res.status(403).json({ error: ERROR.FORBIDDEN });
  }

  const updatedComment = await updateCommentService(
    parsedCommentParams.data,
    parsedCommentBody.data
  );

  if (!updatedComment) {
    return res.status(404).json({ error: ERROR.COMMENT_NOT_FOUND });
  }

  return res.status(200).json(updatedComment);
};

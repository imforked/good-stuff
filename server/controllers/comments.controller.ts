import { Request, Response } from "express";
import { ERROR } from "../constants";
import {
  createCommentBodySchema,
  createCommentParamsSchema,
} from "../schemas/comments";
import { createCommentService } from "../services/comments.service";
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

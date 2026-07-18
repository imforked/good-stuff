import { Request, Response } from "express";
import { createPostService } from "../services/posts.service";
import { createPostBodySchema } from "../schemas/posts";
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

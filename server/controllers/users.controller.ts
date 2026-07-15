import { Request, Response } from "express";
import {
  createProfileBodySchema,
  updateProfileBodySchema,
} from "../schemas/users";
import {
  createProfileService,
  updateProfileService,
} from "../services/users.service";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

export const createProfile = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const parsed = createProfileBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid body",
      details: parsed.error.flatten(),
    });
  }

  const profile = await createProfileService(session.user.id, parsed.data);

  res.status(201).json(profile);
};

export const updateProfile = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const parsed = updateProfileBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid body",
      details: parsed.error.flatten(),
    });
  }

  const newProfile = await updateProfileService(session.user.id, parsed.data);

  res.status(200).json(newProfile);
};

import { Request, Response } from "express";
import {
  createProfileBodySchema,
  updateProfileBodySchema,
} from "../schemas/users";
import {
  createProfileService,
  deleteProfileService,
  updateProfileService,
  getProfileService,
} from "../services/users.service";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { ERROR } from "../constants";

export const createProfile = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: ERROR.UNAUTHORIZED });
  }

  const parsed = createProfileBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
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
    return res.status(401).json({ error: ERROR.UNAUTHORIZED });
  }

  const parsed = updateProfileBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const newProfile = await updateProfileService(session.user.id, parsed.data);

  res.status(200).json(newProfile);
};

export const deleteProfile = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: ERROR.UNAUTHORIZED });
  }

  const deletedProfile = await deleteProfileService(session.user.id);

  return res.status(200).json(deletedProfile);
};

export const getProfile = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: ERROR.UNAUTHORIZED });
  }

  const profile = await getProfileService(session.user.id);

  if (!profile) {
    return res.status(404).json({ error: ERROR.PROFILE_NOT_FOUND });
  }

  return res.status(200).json(profile);
};

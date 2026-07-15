import { Request, Response } from "express";
import {
  createAccountBodySchema,
  updateProfileBodySchema,
} from "../schemas/users";
import {
  createAccountService,
  updateProfileService,
} from "../services/users.service";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

export const createAccount = async (req: Request, res: Response) => {
  const parsed = createAccountBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid body",
      details: parsed.error.flatten(),
    });
  }

  const account = await createAccountService(parsed.data);

  res.status(201).json(account);
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

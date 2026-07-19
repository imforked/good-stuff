import { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";
import { ERROR } from "../constants";

export const requireSession = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ error: ERROR.UNAUTHORIZED });
    return null;
  }

  return session;
};

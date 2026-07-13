import { Request, Response } from "express";
import { createAccountBodySchema } from "../schemas/users";
import { createAccountService } from "../services/users.service";

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

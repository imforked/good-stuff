import { prisma } from "../lib/prisma";
import { z } from "zod";
import { createAccountBodySchema } from "../schemas/users";

type CreateAccountInput = z.infer<typeof createAccountBodySchema>;

export const createAccountService = async ({
  displayName,
  pfpS3Url,
}: CreateAccountInput) => {
  return await prisma.user.create({
    data: {
      profile: {
        create: { displayName, pfpS3Url },
      },
    },
    include: { profile: true },
  });
};

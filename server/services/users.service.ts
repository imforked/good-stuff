import { prisma } from "../lib/prisma";
import { z } from "zod";
import {
  createAccountBodySchema,
  updateProfileBodySchema,
} from "../schemas/users";

type CreateAccountInput = z.infer<typeof createAccountBodySchema>;
type UpdateProfileInput = z.infer<typeof updateProfileBodySchema>;

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

export const updateProfileService = async (
  userId: string,
  { pfpS3Url, displayName }: UpdateProfileInput
) => {
  return await prisma.profile.update({
    where: { userId },
    data: {
      pfpS3Url,
      displayName,
    },
  });
};

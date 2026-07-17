import { prisma } from "../lib/prisma";
import { z } from "zod";
import {
  createProfileBodySchema,
  updateProfileBodySchema,
} from "../schemas/users";

type CreateProfileInput = z.infer<typeof createProfileBodySchema>;
type UpdateProfileInput = z.infer<typeof updateProfileBodySchema>;

export const createProfileService = async (
  userId: string,
  { displayName, pfpS3Url }: CreateProfileInput
) => {
  return await prisma.profile.create({
    data: { userId, displayName, pfpS3Url },
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

export const deleteProfileService = async (userId: string) => {
  return await prisma.profile.delete({ where: { userId } });
};

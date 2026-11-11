import { prisma } from "../lib/prisma.js";
import { GROUP_ROLES } from "../prisma/generated/prisma/client.js";
import { z } from "zod";
import { createGroupBodySchema } from "../schemas/groups.js";

type CreateGroupBody = z.infer<typeof createGroupBodySchema>;

export const createGroupService = async ({
  title,
  userId,
}: CreateGroupBody & { userId: string }) => {
  return await prisma.group.create({
    data: {
      title,
      members: {
        create: {
          userId,
          groupRole: GROUP_ROLES.SUPER_ADMIN,
        },
      },
    },
  });
};

export const getGroupsService = async ({ userId }: { userId: string }) => {
  return await prisma.groupMember.findMany({
    where: { userId },
    include: { group: true },
  });
};

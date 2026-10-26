import { prisma } from "../lib/prisma.js";

export const createListService = async (userId: string, title: string) => {
  return await prisma.userList.create({ data: { userId, title } });
};

export const getListService = async (listId: string) => {
  return await prisma.userList.findUnique({ where: { id: listId } });
};

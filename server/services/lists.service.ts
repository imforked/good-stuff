import { prisma } from "../lib/prisma.js";

export const createList = async (userId: string, title: string) => {
  
}

export const getList = async (listId: string) => {
  return await prisma.userList.findUnique({ where: { id: listId } });
};

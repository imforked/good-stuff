import { prisma } from "../lib/prisma.js";

export const createListService = async (userId: string, title: string) => {
  return await prisma.userList.create({
    data: { userId, title },
    include: { posts: true },
  });
};

export const getListService = async (listId: string) => {
  return await prisma.userList.findUnique({
    where: { id: listId },
    include: { posts: true },
  });
};

export const addPostToUserListService = async (
  listId: string,
  postId: string,
) => {
  return await prisma.userList.update({
    where: { id: listId },
    data: {
      posts: { connect: { id: postId } },
    },
    include: { posts: true },
  });
};

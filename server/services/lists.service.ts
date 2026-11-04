import { PRISMA_UNIQUE_CONSTRAINT } from "../constants/prisma.js";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../prisma/generated/prisma/client.js";

export const createUserListService = async (userId: string, title: string) => {
  try {
    return await prisma.userList.create({
      data: { userId, title },
      include: { posts: true },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === PRISMA_UNIQUE_CONSTRAINT
    ) {
      // The list title already exists.
      return null;
    }

    throw error;
  }
};

export const getUserListService = async (listId: string) => {
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

export const deleteUserListService = async (listId: string) => {
  return await prisma.userList.delete({ where: { id: listId } });
};

export const deletePostFromUserListService = async (
  listId: string,
  postId: string,
) => {
  return await prisma.userList.update({
    where: { id: listId },
    data: {
      posts: { disconnect: { id: postId } },
    },
    include: { posts: true },
  });
};

export const getUserListsService = async (userId: string) => {
  return await prisma.userList.findMany({
    where: { userId },
    include: { posts: true },
  });
};

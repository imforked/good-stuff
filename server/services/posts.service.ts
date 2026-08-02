import { prisma } from "../lib/prisma";
import { createPostBodySchema } from "../schemas/posts";
import { z } from "zod";

type CreatePostBody = z.infer<typeof createPostBodySchema>;

export const createPostService = async (
  userId: string, // from Better Auth / session
  {
    title,
    shortDescription,
    longDescription,
    type,
    location,
    heroImgS3Url,
  }: CreatePostBody
) => {
  return await prisma.post.create({
    data: {
      userId,
      heroImgS3Url,
      title,
      shortDescription,
      longDescription,
      type,
      location,
    },
  });
};

export const getPostService = async (postId: string) => {
  return await prisma.post.findUnique({ where: { id: postId } });
};

export const getPostsService = async (userId: string) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: { include: { profile: true } },
      saves: {
        take: 3,
        include: { user: { include: { profile: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { saves: true } },
    },
  });

  const bookmarkIds = await prisma.bookmark.findMany({
    where: { userId, postId: { in: posts.map((post) => post.id) } },
    select: { postId: true },
  });

  const bookmarkPostIds = new Set(
    bookmarkIds.map((bookmark) => bookmark.postId)
  );

  return posts.map((post) => {
    return {
      isBookmarked: bookmarkPostIds.has(post.id),
      ...post,
    };
  });
};

export const updatePostService = async ({
  postId,
  title,
}: {
  postId: string;
  title: string;
}) => {
  return await prisma.post.update({ where: { id: postId }, data: { title } });
};

export const deletePostService = async (postId: string) => {
  return await prisma.post.delete({ where: { id: postId } });
};

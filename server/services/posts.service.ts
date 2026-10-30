import { Prisma } from "../prisma/generated/prisma/client.js";
import { PRISMA_UNIQUE_CONSTRAINT } from "../constants.js";
import { REDIS_KEYS } from "../constants/redisKeys.js";
import { prisma } from "../lib/prisma.js";
import { createPostBodySchema } from "../schemas/posts.js";
import { z } from "zod";
import { redis } from "../lib/redis.js";
import { Post } from "../prisma/generated/prisma/client.js";

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
  }: CreatePostBody,
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

export const getFeedPostService = async (postId: string, userId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
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

  if (!post) {
    return null;
  }

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  return {
    isBookmarked: Boolean(bookmark),
    ...post,
  };
};

export const getPostsService = async (userId: string) => {
  // If the Redis read fails, return null. A missing key also returns null, so either way we load the posts from Postgres.
  const cache = await redis.get(REDIS_KEYS.FEED_POSTS).catch(() => null);

  let posts: Post[];

  if (cache) {
    posts = JSON.parse(cache);
  } else {
    posts = await prisma.post.findMany({
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

    // If the Redis save fails, ignore the error. The posts are already loaded from Postgres, so this request does not need a return value.
    await redis
      .set(REDIS_KEYS.FEED_POSTS, JSON.stringify(posts), { EX: 30 })
      .catch(() => {});
  }

  const bookmarkIds = await prisma.bookmark.findMany({
    where: { userId, postId: { in: posts.map((post) => post.id) } },
    select: { postId: true },
  });

  const bookmarkPostIds = new Set(
    bookmarkIds.map((bookmark) => bookmark.postId),
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

export const bookmarkPostService = async (userId: string, postId: string) => {
  try {
    return await prisma.bookmark.create({ data: { userId, postId } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === PRISMA_UNIQUE_CONSTRAINT
    ) {
      // The user already bookmarked this post.
      return null;
    }

    throw error;
  }
};

export const unBookmarkPostService = async (userId: string, postId: string) => {
  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (!bookmark) {
    return null;
  }

  await prisma.bookmark.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  return bookmark;
};

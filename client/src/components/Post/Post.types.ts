import type { PostLocation, PostType } from "../../../../shared/constants";

type ProfileSummary = {
  id: string;
  userId: string;
  displayName: string;
  pfpS3Url: string;
  createdAt: string;
  updatedAt: string;
};

type UserSummary = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  profile: ProfileSummary | null;
};

type PostSave = {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  user: UserSummary;
};

export type PostProps = {
  id: string;
  heroImgS3Url: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  type: PostType;
  location: PostLocation;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isBookmarked: boolean;
  user: UserSummary;
  saves: PostSave[];
  _count: {
    saves: number;
  };
};

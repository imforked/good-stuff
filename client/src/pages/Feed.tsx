import { Button } from "../components/Button";
import { ButtonVariant } from "../components/Button/Button.types";
import { Page } from "../components/Page";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router";
import { Post } from "../components/Post";
import { useQuery } from "@tanstack/react-query";
import type { PostProps } from "../components/Post/Post.types";
import { queryKeys } from "../constants/queryKeys";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Feed = () => {
  const navigate = useNavigate();

  const postsQuery = useQuery<PostProps[]>({
    queryKey: queryKeys.posts,
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/posts`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP Error. Status: ${response.status}`);
      }
      return response.json();
    },
  });

  return (
    <Page>
      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => navigate("/"),
            },
          });
        }}
      >
        Sign Out
      </Button>
      {postsQuery.isPending ? (
        <p className="py-6 text-center text-sm text-gray-500">Loading posts</p>
      ) : postsQuery.isError ? (
        <div className="flex flex-col gap-3 py-6">
          <p className="text-center text-sm text-gray-500">
            {postsQuery.error.message}
          </p>
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => postsQuery.refetch()}
            disabled={postsQuery.isRefetching}
          >
            Try again
          </Button>
        </div>
      ) : postsQuery.data.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">No posts yet</p>
      ) : (
        postsQuery.data.map((post) => {
          return <Post key={post.id} {...post} />;
        })
      )}
    </Page>
  );
};

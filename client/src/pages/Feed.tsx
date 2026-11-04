import { Button } from "../components/Button";
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

  const { data: posts } = useQuery<PostProps[]>({
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
      {posts?.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </Page>
  );
};

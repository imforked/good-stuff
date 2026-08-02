import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router";
import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import { type PostProps } from "../components/Post/Post.types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Feed = () => {
  const [posts, setPosts] = useState<PostProps[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/posts`, {
          credentials: "include",
        });

        if (!response.ok) {
          return console.error(`HTTP Error. Status: ${response.status}`);
        }

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        return console.error(`Failed to get posts:`, error);
      }
    };

    getPosts();
  }, []);

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

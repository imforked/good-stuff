import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router";

export const Feed = () => {
  const navigate = useNavigate();

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
    </Page>
  );
};

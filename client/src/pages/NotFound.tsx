import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="font-serif text-5xl">Page not found.</h1>
        <Button className="mt-5" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </Page>
  );
};

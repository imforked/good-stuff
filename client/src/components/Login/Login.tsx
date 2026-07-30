import { Drawer } from "./components/Drawer";
import { LoginRecommendationCarousel } from "./components/LoginRecommendationCarousel";
import { authClient } from "../../lib/auth-client";
import { useState } from "react";
import { View } from "./Login.types";

export const Login = () => {
  const [view, setView] = useState<View>(View.Welcome);
  const [pendingView, setPendingView] = useState<View>(View.Welcome);
  const [drawerIsRetracting, setDrawerIsRetracting] = useState(false);

  const { data } = authClient.useSession();

  if (data?.session) {
    return <div>will add something else later</div>;
  }

  return (
    <div className="relative flex-1 overflow-hidden bg-background">
      <LoginRecommendationCarousel />
      <Drawer
        view={view}
        setView={setView}
        pendingView={pendingView}
        setPendingView={setPendingView}
        isRetracting={drawerIsRetracting}
        setDrawerIsRetracting={setDrawerIsRetracting}
      />
    </div>
  );
};

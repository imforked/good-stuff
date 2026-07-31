import { Drawer } from "./components/Drawer";
import { useState } from "react";
import { View } from "./Login.types";
import { LoginRecommendationCarousel } from "./components/LoginRecommendationCarousel";

export const Login = () => {
  const [view, setView] = useState<View>(View.Welcome);
  const [pendingView, setPendingView] = useState<View>(View.Welcome);
  const [drawerIsRetracting, setDrawerIsRetracting] = useState(false);

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

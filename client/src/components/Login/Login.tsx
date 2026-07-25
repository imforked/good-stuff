import { Drawer } from "./components/Drawer";
import { LoginRecommendationCarousel } from "./components/LoginRecommendationCarousel";

export const Login = () => {
  return (
    <div className="relative flex-1 overflow-hidden bg-surface">
      <LoginRecommendationCarousel />
      <Drawer />
    </div>
  );
};

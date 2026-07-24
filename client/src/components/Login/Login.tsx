import { LoginRecommendation } from "./components/LoginRecommendation";
import { RECOMMENDATIONS } from "./Login.data";
import { Drawer } from "./components/Drawer";

export const Login = () => {
  return (
    <div className="relative flex-1 bg-surface">
      <LoginRecommendation recommendations={RECOMMENDATIONS} />
      <Drawer />
    </div>
  );
};

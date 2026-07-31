import { Routes, Route } from "react-router";
import { Feed } from "../pages/Feed";
import { Login } from "../pages/Login";
import { AuthGuard } from "./AuthGuard";
import { SignedOutGuard } from "./SignedOutGuard";
import { NotFound } from "../pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/feed" element={<Feed />} />
      </Route>
      <Route element={<SignedOutGuard />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

import { Routes, Route } from "react-router";
import { AuthGuard } from "./AuthGuard";
import { SignedOutGuard } from "./SignedOutGuard";
import { Feed, Login, NotFound } from "../pages";

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

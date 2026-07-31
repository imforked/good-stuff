import { Outlet, Navigate } from "react-router";
import { authClient } from "../lib/auth-client";

export const SignedOutGuard = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (data?.session) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
};

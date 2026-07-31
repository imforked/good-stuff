import { Navigate, Outlet } from "react-router";
import { authClient } from "../lib/auth-client";

export const AuthGuard = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (!data?.session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

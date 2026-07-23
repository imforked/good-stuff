import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[700px] flex-col">
      {children}
    </div>
  );
};

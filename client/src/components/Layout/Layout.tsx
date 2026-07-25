import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[500px] flex-col border-l border-r border-border">
      {children}
    </div>
  );
};

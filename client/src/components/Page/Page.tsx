import { type PageProps } from "./Page.types";

export const Page = ({ hasPadding = true, children }: PageProps) => {
  return (
    <div className={`flex flex-1 flex-col ${hasPadding ? "px-4" : ""}`}>
      {children}
    </div>
  );
};

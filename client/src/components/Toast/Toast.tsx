import { Toaster as SonnerToaster, toast } from "sonner";

const toastClassName =
  "flex w-[min(calc(100vw-2rem),28rem)] items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 font-sans text-sm text-foreground shadow-floating data-[type=error]:border-danger data-[type=error]:text-danger";

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-center"
      offset={16}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: toastClassName,
          title: "font-sans text-sm",
        },
      }}
    />
  );
};

export { toast };

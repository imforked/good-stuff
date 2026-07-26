import { Fragment } from "react/jsx-runtime";
import { type DrawerContentProps } from "./Drawer.types";

export const DrawerContent = ({
  title,
  description,
  content,
}: DrawerContentProps) => {
  return (
    <Fragment>
      <h2 className="w-fit font-serif text-5xl tracking-wide leading-none text-balance mt-8 text-center">
        {title}
      </h2>
      {description && (
        <p className="w-fit text-md text-center">{description}</p>
      )}
      {content}
    </Fragment>
  );
};

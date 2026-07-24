import { ButtonVariant, type ButtonStyles } from "./Button.types";

const base = "py-2 px-3 rounded-md w-full transition-all duration-250 hover:cursor-pointer";

export const buttonStyles: ButtonStyles = {
  [ButtonVariant.PRIMARY]: `${base} bg-black text-white hover:bg-neutral-800`,
  [ButtonVariant.SECONDARY]: `${base} bg-white text-black border border-border hover:bg-white-hover`,
};

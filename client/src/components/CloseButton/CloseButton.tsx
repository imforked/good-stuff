import type { CloseButtonProps } from "./CloseButton.types";
import { CloseIcon } from "./assets/CloseIcon";

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button className="border border-border rounded-full p-2 cursor-pointer" onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

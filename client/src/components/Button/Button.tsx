import { buttonStyles } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({ variant, onClick, text, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonStyles[variant]} ${className ?? ""}`}
    >
      {text}
    </button>
  );
};

import { Fragment } from "react/jsx-runtime";
import { buttonStyles } from "./Button.styles";
import { ButtonVariant, type ButtonProps } from "./Button.types";

export const Button = ({
  variant = ButtonVariant.PRIMARY,
  error,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Fragment>
      <button
        onClick={onClick}
        className={`${buttonStyles[variant]} ${className ?? ""}`}
        {...rest}
      >
        {children}
      </button>

      <p
        className={`text-xs text-center min-h-[20px] w-full pb-1 block ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </p>
    </Fragment>
  );
};

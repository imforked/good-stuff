import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  variant?: ButtonVariant;
  error?: string;
  reserveErrorSpace?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export type ButtonStyles = Record<ButtonVariant, string>;

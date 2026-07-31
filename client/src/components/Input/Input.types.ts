import type { InputHTMLAttributes } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

export type InputProps = {
  placeholder?: string;
  helperText?: string;
  register: UseFormRegisterReturn;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

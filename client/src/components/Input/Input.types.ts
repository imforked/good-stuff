import { type UseFormRegisterReturn } from "react-hook-form";

export type InputProps = {
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  className?: string;
};

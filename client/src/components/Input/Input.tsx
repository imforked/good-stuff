import type { InputProps } from "./Input.types";

export const Input = ({
  placeholder,
  helperText,
  register,
  className,
  ...rest
}: InputProps) => {
  return (
    <div>
      <div
        className={`bg-white border border-border rounded-md focus-within:border-primary ${className}`}
      >
        <input
          className="focus:outline-none pl-3 w-full h-[40px]"
          placeholder={placeholder}
          {...rest}
          {...register}
        />
      </div>
      <span
        className={`text-xs min-h-[20px] w-full pl-3 pb-1 block ${
          helperText ? "opacity-100" : "opacity-0"
        }`}
      >
        {helperText}
      </span>
    </div>
  );
};

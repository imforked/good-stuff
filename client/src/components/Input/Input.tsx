import type { InputProps } from "./Input.types";

export const Input = ({
  placeholder,
  errorMessage,
  register,
  className,
}: InputProps) => {
  return (
    <div>
      <div
        className={`bg-white border border-border rounded-md focus-within:border-primary ${className}`}
      >
        <input
          className="focus:outline-none pl-3 w-full h-[40px]"
          placeholder={placeholder}
          {...register}
        />
      </div>
      <span className={`text-xs min-h-[20px] w-full pl-3 pb-1 block ${errorMessage ? "opacity-100" : "opacity-0"}`}>
        {errorMessage}
      </span>
    </div>
  );
};

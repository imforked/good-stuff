import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../../../Input";
import { LogInFormSchema, type LogInFormInputs } from "./LogInForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../Button";
import { authClient } from "../../../../lib/auth-client";
import { useState } from "react";
import type { BetterAuthError } from "better-auth";
import type { InputProps } from "../../../Input/Input.types";

export const LogInForm = () => {
  const [authError, setAuthError] = useState<BetterAuthError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormInputs>({
    resolver: zodResolver(LogInFormSchema),
  });

  const INPUT_DATA: InputProps[] = [
    {
      placeholder: "Email",
      register: register("email"),
      helperText: errors["email"]?.message,
    },
    {
      placeholder: "Password",
      register: register("password"),
      helperText: errors["password"]?.message,
      type: "password",
    },
  ];

  const onSubmit: SubmitHandler<LogInFormInputs> = async ({
    email,
    password,
  }) => {
    await authClient.signIn.email(
      {
        email: email,
        password: password,
        callbackURL: "/feed",
      },
      {
        onError: (errContent) => {
          setAuthError(errContent.error);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
      {INPUT_DATA.map((data, index) => {
        return <Input key={index} {...data} />;
      })}
      <Button
        reserveErrorSpace
        disabled={isSubmitting}
        error={authError?.message}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

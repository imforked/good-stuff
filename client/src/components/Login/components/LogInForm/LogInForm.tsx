import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../../../Input";
import { LogInFormSchema, type LogInFormInputs } from "./LogInForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../Button";
import { authClient } from "../../../../lib/auth-client";
import { useState } from "react";
import type { BetterAuthError } from "better-auth";

export const LogInForm = () => {
  const [authError, setAuthError] = useState<BetterAuthError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormInputs>({
    resolver: zodResolver(LogInFormSchema),
  });

  const INPUT_DATA = [
    {
      placeholder: "Email",
      register: register("email"),
      errorMessage: errors["email"]?.message,
    },
    {
      placeholder: "Password",
      register: register("password"),
      errorMessage: errors["password"]?.message,
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
        callbackURL: "placeholder url",
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
      <Button disabled={isSubmitting} error={authError?.message} type="submit">
        Submit
      </Button>
    </form>
  );
};

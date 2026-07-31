import { SignUpFormSchema } from "./SignUpForm.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type SignUpFormInputs } from "./SignUpForm.schema";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../../../../lib/auth-client";
import { useState } from "react";
import { BetterAuthError } from "better-auth";
import type { InputProps } from "../../../Input/Input.types";

export const SignUpForm = () => {
  const [authError, setAuthError] = useState<BetterAuthError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const INPUT_DATA: InputProps[] = [
    {
      placeholder: "Full Name",
      register: register("name"),
      helperText: errors["name"]?.message,
    },
    {
      placeholder: "Email",
      register: register("email"),
      helperText: errors["email"]?.message,
    },
    {
      placeholder: "Password",
      register: register("password"),
      helperText: errors["password"]?.message ?? "At least 12 characters.",
      type: "password",
    },
    {
      placeholder: "Re-Type Password",
      register: register("passwordMatch"),
      helperText: errors["passwordMatch"]?.message,
      type: "password",
    },
  ];

  const onSubmit: SubmitHandler<SignUpFormInputs> = async ({
    name,
    email,
    password,
  }) => {
    await authClient.signUp.email(
      {
        name: name,
        email: email,
        password: password,
        callbackURL: "placeholder url",
      },
      {
        onError: (errContext) => {
          setAuthError(errContext.error);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col mt-4"
    >
      {INPUT_DATA.map((input, index) => {
        return <Input key={`${input.placeholder}-${index}`} {...input} />;
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

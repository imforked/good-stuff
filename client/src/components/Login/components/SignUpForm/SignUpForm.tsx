import { SignUpFormSchema } from "./SignUpForm.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type SignUpFormInputs } from "./SignUpForm.schema";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../../../../lib/auth-client";
import { useState } from "react";
import { BetterAuthError } from "better-auth";

export const SignUpForm = () => {
  const [authError, setAuthError] = useState<BetterAuthError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const INPUT_DATA = [
    {
      placeholder: "Full Name",
      register: register("name"),
      errorMessage: errors["name"]?.message,
    },
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
    {
      placeholder: "Re-Type Password",
      register: register("passwordMatch"),
      errorMessage: errors["passwordMatch"]?.message,
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

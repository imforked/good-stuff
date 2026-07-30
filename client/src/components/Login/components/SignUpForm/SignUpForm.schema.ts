import { z } from "zod";

const PASSWORD_MIN_LENGTH = 12;

export const emailSchema = z.email({
  error: "Please enter a valid email address.",
});

export const passwordSchema = z
  .string()
  .trim()
  .min(PASSWORD_MIN_LENGTH, {
    error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
  });

export const SignUpFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordMatch: z.string(),
    name: z.string().trim().min(1, "Please enter a name."),
  })
  .refine((data) => data.password === data.passwordMatch, {
    message: "Passwords don't match",
    path: ["passwordMatch"],
  });

export type SignUpFormInputs = z.infer<typeof SignUpFormSchema>;

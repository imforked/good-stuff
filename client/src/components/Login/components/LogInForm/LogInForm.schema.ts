import { z } from "zod";
import { emailSchema } from "../SignUpForm/SignUpForm.schema";

export const LogInFormSchema = z.object({
  email: emailSchema,
  password: z.string().trim(),
});

export type LogInFormInputs = z.infer<typeof LogInFormSchema>;

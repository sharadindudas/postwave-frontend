import * as v from "valibot";
import { emailSchema, nameSchema, passwordSchema } from "./common";

export const SignupSchema = v.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
});
export type SignupSchema = v.InferInput<typeof SignupSchema>;

export const LoginSchema = v.object({
  email: emailSchema,
  password: passwordSchema
});
export type LoginSchema = v.InferInput<typeof LoginSchema>;

export const ForgotPasswordSchema = v.object({
  email: emailSchema
});
export type ForgotPasswordSchema = v.InferInput<typeof ForgotPasswordSchema>;

export const UpdatePasswordSchema = v.pipe(
  v.object({
    newPassword: passwordSchema,
    confirmNewPassword: v.string()
  }),
  v.forward(
    v.partialCheck([["newPassword"], ["confirmNewPassword"]], (input) => input.newPassword === input.confirmNewPassword, "Passwords do not match"),
    ["confirmNewPassword"]
  )
);
export type UpdatePasswordSchema = v.InferInput<typeof UpdatePasswordSchema>;

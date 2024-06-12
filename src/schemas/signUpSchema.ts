import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, { message: "Username is too short, minimum 3 characters" })
  .max(20, { message: "Username is too long, maximum 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username is invalid, only allow letters, numbers and underscore",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

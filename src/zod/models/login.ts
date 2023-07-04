import { z } from "zod";
import { forgotPasswordSchema } from "./forgotPassword";

export const loginSchema = forgotPasswordSchema.extend({
  password: z.string().nonempty("password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

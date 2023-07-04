import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().nonempty("email is required").email(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

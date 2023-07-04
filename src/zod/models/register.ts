import { z } from "zod";
import { loginSchema } from "./login";

export const registerSchema = loginSchema.extend({
  name: z.string().trim().nonempty("name is required"),
  password: z
    .string()
    .trim()
    .min(8, { message: "password must have atleast 6 characters" })
    .nonempty("password is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

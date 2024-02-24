import { z } from "zod";
import { UserRoleStatus } from "../user/user.constant";


// Define the Zod validation schema
const registerValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .max(12, { message: "Password cannot be more than 12 characters" }),
    role: z.enum([...(UserRoleStatus as [string, ...string[]])]),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .max(12, { message: "Password cannot be more than 12 characters" }),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema
}
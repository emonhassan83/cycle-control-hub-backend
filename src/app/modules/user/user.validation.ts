import { z } from "zod";
import { UserRoleStatus } from "./user.constant";

// Define the Zod validation schema
const UserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .max(12, { message: "Password cannot be more than 12 characters" }),
    role: z.enum([...(UserRoleStatus as [string, ...string[]])]).optional(),
  }),
});

export const UserValidation = {
  UserValidationSchema,
};

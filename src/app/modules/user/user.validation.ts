import { z } from 'zod';
import { UserRoleStatus } from './user.constant';

// Define the Zod validation schema
const UserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'User name is required!',
    }),
    email: z.string({
      required_error: 'Email is required!',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(12, { message: 'Password cannot be more than 12 characters' }),
    contactNumber: z.string({
      required_error: 'Contract number is required!',
    }),
    address: z.string({
      required_error: 'Address is required!',
    }),
    role: z.enum([...(UserRoleStatus as [string, ...string[]])]).optional(),
  }),
});

const UserUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'User name is required!',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .optional(),
    contactNumber: z
      .string({
        required_error: 'Contract number is required!',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required!',
      })
      .optional(),
    role: z.enum([...(UserRoleStatus as [string, ...string[]])]).optional(),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
};

import { z } from 'zod';
import { GenderOptions, UserRoleStatus, UserStatus } from './user.constant';

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
    photoUrl: z
      .string({
        required_error: 'Photo url is required!',
      })
      .optional(),
    gender: z.enum([...(GenderOptions as [string, ...string[]])]).optional(),
  }),
});

const changeUserRoleValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required!',
    }),
    role: z.enum([...(UserRoleStatus as [string, ...string[]])], {
      required_error: 'User role is required!',
    }),
  }),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required!',
    }),
    status: z.enum([...(UserStatus as [string, ...string[]])], {
      required_error: 'User status is required!',
    }),
  }),
});

const UserSoftDeleteValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required!',
    }),
    isDeleted: z.boolean({
      required_error: 'isDeleted field is required!',
    }),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
  changeUserRoleValidationSchema,
  changeUserStatusValidationSchema,
  UserSoftDeleteValidationSchema,
};

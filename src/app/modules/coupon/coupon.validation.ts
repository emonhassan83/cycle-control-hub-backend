import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Coupon name is required!',
      })
      .min(5)
      .max(255),
    expiry: z
      .string({
        required_error: 'Coupon expiry is required!',
      })
      .transform((str) => new Date(str)),
    discountType: z.enum(['percentage', 'fixed'], {
      required_error: 'Coupon discount type is required!',
    }),
    discountAmount: z
      .number({
        required_error: 'Coupon discount amount is required!',
      })
      .positive(),
    applicableBikeIds: z
      .array(
        z.string({
          required_error: 'Coupon applicable bikeIds is required!',
        }),
      )
      .optional(),
    applicableProductIds: z
      .array(
        z.string({
          required_error: 'Coupon applicable productIds is required!',
        }),
      )
      .optional(),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Coupon name is required!',
      })
      .min(5)
      .max(255)
      .optional(),
    expiry: z
      .string({
        required_error: 'Coupon expiry is required!',
      })
      .optional(),
    discountType: z
      .enum(['percentage', 'fixed'], {
        required_error: 'Coupon discount type is required!',
      })
      .optional(),
    discountAmount: z
      .number({
        required_error: 'Coupon discount amount is required!',
      })
      .positive()
      .optional(),
    applicableBikeIds: z
      .array(
        z.string({
          required_error: 'Coupon applicable bikeIds is required!',
        }),
      )
      .optional(),
    applicableProductIds: z
      .array(
        z.string({
          required_error: 'Coupon applicable productIds is required!',
        }),
      )
      .optional(),
  }),
});

export const CouponValidation = {
  createCouponValidationSchema,
  updateCouponValidationSchema,
};

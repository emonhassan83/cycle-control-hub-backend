import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(255),
    expiry: z.string().transform((str) => new Date(str)),
    discountType: z.enum(['percentage', 'fixed']),
    discountAmount: z.number().positive(),
    applicableBikeIds: z.array(z.string()),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(255).optional(),
    expiry: z.date().optional(),
    discountType: z.enum(['percentage', 'fixed']).optional(),
    discountAmount: z.number().positive().optional(),
    applicableBikeIds: z.array(z.string()).optional(),
  }),
});

export const CouponValidation = {
  createCouponValidationSchema,
  updateCouponValidationSchema,
};

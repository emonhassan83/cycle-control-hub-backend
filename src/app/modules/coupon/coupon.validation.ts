import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(20),
    expiry: z.date(),
    discount: z.number().positive(),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(20).optional(),
    expiry: z.date().optional(),
    discount: z.number().positive().optional(),
  }),
});

export const CouponValidation = {
  createCouponValidationSchema,
  updateCouponValidationSchema,
};

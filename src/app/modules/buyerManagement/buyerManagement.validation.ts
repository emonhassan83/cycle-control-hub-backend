import { z } from 'zod';

const buyingBikeValidationSchema = z.object({
  body: z.object({
    buyerName: z.string(),
    buyerEmail: z.string(),
    phoneNumber: z.number(),
    buyingDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: 'Invalid date format' }).optional(),
    seller: z.string(),
    bike: z.string(),
    isConfirmed: z.boolean().optional(),
  }),
});

export const buyerValidations = {
    buyingBikeValidationSchema,
};

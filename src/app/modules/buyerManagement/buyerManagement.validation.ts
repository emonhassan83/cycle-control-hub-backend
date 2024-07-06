import { z } from 'zod';

const buyingBikeValidationSchema = z.object({
  body: z.object({
    buyer: z.string({
      required_error: 'Bike buyer is required!',
    }).optional(),
    seller: z.string({
      required_error: 'Bike seller is required!',
    }),
    bike: z.string({
      required_error: 'Bike id is required!',
    }),
    buyingDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: 'Invalid date format' }).optional(),
  }),
});

export const buyerValidations = {
    buyingBikeValidationSchema,
};

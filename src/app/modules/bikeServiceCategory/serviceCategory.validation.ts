import { z } from 'zod';

const createBikeServiceCategoryValidationSchema = z.object({
  body: z.object({
    serviceName: z.string(),
    price: z.number().positive(),
    serviceDetails:z.string(),
    serviceProvider:z.string(),
  }),
});

const updateBikeServiceCategoryValidationSchema = z.object({
  body: z.object({
    serviceName: z.string().optional(),
    price: z.number().positive().optional(),
    serviceDetails:z.string().optional(),
    serviceProvider:z.string().optional(),
  }),
});

export const BikeServiceCategoryValidation = {
  createBikeServiceCategoryValidationSchema,
  updateBikeServiceCategoryValidationSchema,
};

import { z } from 'zod';
import { Type } from './bike.constant';

const createBikeValidationSchema = z.object({
  body: z.object({
    productName: z.string(),
    productImage: z.string(),
    seller: z.string().optional(),
    productQuantity: z.number(),
    price: z.number(),
    releaseDate: z.string(),
    brand: z.string(),
    model: z.string(),
    type: z.enum([...Type] as [string, ...string[]]),
    size: z.string(),
    color: z.string(),
    frameMaterial: z.string(),
    suspensionType: z.string(),
    manufacturerCountry: z.string(),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    productName: z.string().optional(),
    productQuantity: z.number().optional(),
    price: z.number().optional(),
    releaseDate: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    type: z.enum([...Type] as [string, ...string[]]).optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    frameMaterial: z.string().optional(),
    suspensionType: z.string().optional(),
    manufacturerCountry: z.string().optional(),
  }),
});

const salesBikeValidationSchema = z.object({
  body: z.object({
    sellerName: z.string(),
    productQuantity: z.number(),
    saleDate: z.string(),
  }),
});

export const bikeValidations = {
  createBikeValidationSchema,
  salesBikeValidationSchema,
  updateBikeValidationSchema,
};

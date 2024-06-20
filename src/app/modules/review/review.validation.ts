import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId name is required!',
    }),
    bikeId: z
      .string({
        required_error: 'Bike Id is required!',
      })
      .optional(),
    productId: z
      .string({
        required_error: 'Product Id is required!',
      })
      .optional(),
    rating: z.number({
      required_error: 'Rating is required!',
    }),
    comment: z.string({
      required_error: 'Comment is required!',
    }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    bikeId: z
      .string({
        required_error: 'Bike Id is required!',
      })
      .optional(),
    productId: z
      .string({
        required_error: 'Product Id is required!',
      })
      .optional(),
    rating: z
      .number({
        required_error: 'Rating is required!',
      })
      .optional(),
    comment: z
      .string({
        required_error: 'Comment is required!',
      })
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};

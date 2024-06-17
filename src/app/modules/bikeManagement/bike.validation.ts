import { z } from 'zod';
import { Type } from './bike.constant';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Bike name is required!',
    }),
    image: z.string({
      required_error: 'Bike image is required!',
    }),
    description: z.string({
      required_error: 'Bike description is required!',
    }),
    seller: z.string({
      required_error: 'Bike seller is required!',
    }).optional(),
    quantity: z.number({
      required_error: 'Bike quantity is required!',
    }),
    price: z.number({
      required_error: 'Bike price is required!',
    }),
    releaseDate: z.string({
      required_error: 'Bike release date is required!',
    }),
    brand: z.string({
      required_error: 'Bike brand is required!',
    }),
    model: z.string({
      required_error: 'Bike model is required!',
    }),
    type: z.enum([...Type] as [string, ...string[]], {
      required_error: 'Bike type is required!',
    }),
    size: z.string({
      required_error: 'Bike size is required!',
    }),
    color: z.string({
      required_error: 'Bike color is required!',
    }),
    frameMaterial: z.string({
      required_error: 'Bike frame material is required!',
    }),
    suspensionType: z.string({
      required_error: 'Bike suspension type is required!',
    }),
    manufacturerCountry: z.string({
      required_error: 'Bike manufacturer country is required!',
    }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Bike name is required!',
      })
      .optional(),
    quantity: z
      .number({
        required_error: 'Bike quantity is required!',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Bike price is required!',
      })
      .optional(),
    releaseDate: z
      .string({
        required_error: 'Bike release date is required!',
      })
      .optional(),
    brand: z
      .string({
        required_error: 'Bike brand is required!',
      })
      .optional(),
    model: z
      .string({
        required_error: 'Bike model is required!',
      })
      .optional(),
    type: z
      .enum([...Type] as [string, ...string[]], {
        required_error: 'Bike type is required!',
      })
      .optional(),
    size: z
      .string({
        required_error: 'Bike size is required!',
      })
      .optional(),
    color: z
      .string({
        required_error: 'Bike color is required!',
      })
      .optional(),
    frameMaterial: z
      .string({
        required_error: 'Bike frame material is required!',
      })
      .optional(),
    suspensionType: z
      .string({
        required_error: 'Bike suspension type is required!',
      })
      .optional(),
    manufacturerCountry: z
      .string({
        required_error: 'Bike manufacturer country is required!',
      })
      .optional(),
  }),
});

const salesBikeValidationSchema = z.object({
  body: z.object({
    seller: z.string({
      required_error: 'Bike seller is required!',
    }),
    quantity: z.number({
      required_error: 'Bike quantity is required!',
    }),
    saleDate: z.string({
      required_error: 'Bike sale date is required!',
    }),
  }),
});

export const bikeValidations = {
  createBikeValidationSchema,
  salesBikeValidationSchema,
  updateBikeValidationSchema,
};

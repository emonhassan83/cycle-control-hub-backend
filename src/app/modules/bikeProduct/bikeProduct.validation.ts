import { z } from "zod";

const createBikeProductValidationSchema = z.object({
    body: z.object({
      product: z.string({
        required_error: "Product name is required!"
      }),
      image: z.string({
        required_error: "Product image is required!"
      }),
      description: z.string({
        required_error: "Product description is required!"
      }),
      seller: z.string({
        required_error: "Product seller is required!"
      }),
      quantity: z.number({
        required_error: "Product quantity is required!"
      }),
      price: z.number({
        required_error: "Product price is required!"
      }),
      releaseDate: z.string({
        required_error: "Product release date is required!"
      }),
      brand: z.string({
        required_error: "Product brand is required!"
      }),
      model: z.string({
        required_error: "Product model is required!"
      }),
      color: z.string({
        required_error: "Product color is required!"
      }),
      frameMaterial: z.string({
        required_error: "Product frame material is required!"
      }),
      manufacturerCountry: z.string({
        required_error: "Product manufacturer country is required!"
      }),
    }),
  });

const updateBikeProductValidationSchema = z.object({
    body: z.object({
      product: z.string({
        required_error: "Product name is required!"
      }).optional(),
      image: z.string({
        required_error: "Product image is required!"
      }).optional(),
      description: z.string({
        required_error: "Product description is required!"
      }).optional(),
      quantity: z.number({
        required_error: "Product quantity is required!"
      }).optional(),
      price: z.number({
        required_error: "Product price is required!"
      }).optional(),
      releaseDate: z.string({
        required_error: "Product release date is required!"
      }).optional(),
      brand: z.string({
        required_error: "Product brand is required!"
      }).optional(),
      model: z.string({
        required_error: "Product model is required!"
      }).optional(),
      color: z.string({
        required_error: "Product color is required!"
      }).optional(),
      frameMaterial: z.string({
        required_error: "Product frame material is required!"
      }).optional(),
      manufacturerCountry: z.string({
        required_error: "Product manufacturer country is required!"
      }).optional(),
    }),
  });

  export const bikeProductValidations = {
    createBikeProductValidationSchema,
    updateBikeProductValidationSchema
  };
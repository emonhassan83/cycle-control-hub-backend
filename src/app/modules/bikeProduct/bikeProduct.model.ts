import { Schema, model } from "mongoose";
import { TBikeProduct } from "./bikeProduct.interface";

const bikeProductSchema = new Schema<TBikeProduct>(
    {
      product: { type: String, required: true },
      image: { type: String, required: true},
      seller: { type: Schema.Types.ObjectId, ref: 'User' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      releaseDate: { type: String, required: true },
      brand: { type: String, required: true },
      model: { type: String, required: true },
      color: { type: String, required: true },
      frameMaterial: { type: String, required: true },
      manufacturerCountry: { type: String, required: true }
    },
    {
      timestamps: true,
    },
  );
  
  export const Bike = model<TBikeProduct>('BikeProduct', bikeProductSchema);
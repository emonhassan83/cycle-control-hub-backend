import { Types } from "mongoose";

export type TBikeProduct = {
    product: string;
    image: string;
    description: string;
    seller?: Types.ObjectId;
    quantity: number;
    price: number;
    releaseDate: string;
    brand: string;
    model: string;
    color: string;
    frameMaterial: string;
    manufacturerCountry: string;
  };
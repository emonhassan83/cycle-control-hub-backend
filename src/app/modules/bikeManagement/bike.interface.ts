import { Types } from "mongoose";

export type TType = "road" | "mountain" | "hybrid" | "electric" | "kids";

export type TBike = {
    productName: string;
    productImage: string;
    seller?: Types.ObjectId;
    productQuantity: number;
    price: number;
    releaseDate: string;
    brand: string;
    model: string;
    type: TType;
    size: string;
    color: string;
    frameMaterial: string;
    suspensionType: string;
    manufacturerCountry: string;
    isSale?: boolean;
  };

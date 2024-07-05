import { Types } from 'mongoose';

export type TType = 'road' | 'mountain' | 'hybrid' | 'electric' | 'kids';

export type TBike = {
  name: string;
  image: string;
  description: string;
  seller: Types.ObjectId;
  bike?: Types.ObjectId;
  quantity: number;
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

export type TSaleBike = {
  bikeId: Types.ObjectId;
  quantity: number;
  saleDate: string;
};

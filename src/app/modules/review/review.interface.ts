import { Types } from 'mongoose';

export type TReview = {
  userId: Types.ObjectId;
  bikeId?: Types.ObjectId;
  productId?: Types.ObjectId;
  rating: number;
  comment: string;
};

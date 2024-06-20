import { Types } from 'mongoose';

export type TReview = {
  user: Types.ObjectId;
  bike?: Types.ObjectId;
  product?: Types.ObjectId;
  rating: number;
  comment: string;
};

import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema<TCoupon>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      upperCase: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Coupon = model<TCoupon>('Coupon', couponSchema);

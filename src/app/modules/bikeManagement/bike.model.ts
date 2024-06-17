import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';
import { Type } from './bike.constant';

const bikeSchema = new Schema<TBike>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: {
      type: String,
      enum: Type,
      required: true,
    },
    size: { type: String, required: true },
    color: { type: String, required: true },
    frameMaterial: { type: String, required: true },
    suspensionType: { type: String, required: true },
    manufacturerCountry: { type: String, required: true },
    isSale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Bike = model<TBike>('Bike', bikeSchema);

const saleBikeSchema = new Schema<TBike>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: {
      type: String,
      enum: Type,
      required: true,
    },
    size: { type: String, required: true },
    color: { type: String, required: true },
    frameMaterial: { type: String, required: true },
    suspensionType: { type: String, required: true },
    manufacturerCountry: { type: String, required: true },
    isSale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const SaleBike = model<TBike>('SaleBike', saleBikeSchema);

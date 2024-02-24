import { Schema, model } from 'mongoose';
import { TBuyer } from './buyerManagement.interface';

const buyerSchema = new Schema<TBuyer>(
  {
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    phoneNumber: { type: Number, required: true},
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bike: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    buyingDate: { type: Date, required: true, default: new Date},
    isConfirmed: { type: Boolean, default: false},
  },
  {
    timestamps: true,
  },
);

export const Buyer = model<TBuyer>('Buyer', buyerSchema);

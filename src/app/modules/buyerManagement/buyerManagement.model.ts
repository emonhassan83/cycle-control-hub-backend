import { Schema, model } from 'mongoose';
import { TBuyer } from './buyerManagement.interface';

const buyerSchema = new Schema<TBuyer>(
  {
    buyer: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bike: { type: Schema.Types.ObjectId, ref: 'SaleBike', required: true },
    buyingDate: { type: Date, required: true, default: new Date},
    isConfirmed: { type: Boolean, default: false},
  },
  {
    timestamps: true,
  },
);

export const Buyer = model<TBuyer>('Buyer', buyerSchema);

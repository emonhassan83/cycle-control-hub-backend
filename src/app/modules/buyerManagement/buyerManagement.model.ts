import { Schema, model } from 'mongoose';
import { TBuyer } from './buyerManagement.interface';
import { Status } from './buyerManagement.constant';

const buyerSchema = new Schema<TBuyer>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bike: { type: Schema.Types.ObjectId, ref: 'SaleBike', required: true },
    transactionId: { type: String, required: true },
    paymentGatewayData: { type: Schema.Types.Mixed, default: null },
    amount: { type: Number, required: true },
    buyingDate: { type: Date, required: true, default: new Date() },
    status: { type: String, default: 'UNPAID', enum: Status },
  },
  {
    timestamps: true,
  },
);

export const Buyer = model<TBuyer>('Buyer', buyerSchema);

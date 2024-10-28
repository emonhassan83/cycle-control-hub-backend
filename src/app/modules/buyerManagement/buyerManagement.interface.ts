import { Types } from "mongoose";

export type TStatus = 'PAID' | 'UNPAID';

export type TBuyer = {
    buyer?: Types.ObjectId;
    seller: Types.ObjectId;
    bike: Types.ObjectId;
    transactionId: string;
    paymentGatewayData: Record<string, unknown>;
    amount: number;
    buyingDate: Date;
    status?: TStatus;
  };
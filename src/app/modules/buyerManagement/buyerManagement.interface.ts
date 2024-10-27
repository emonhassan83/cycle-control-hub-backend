import { Types } from "mongoose";

export type TBuyer = {
    buyer?: Types.ObjectId;
    seller: Types.ObjectId;
    bike: Types.ObjectId;
    transactionId: string;
    paymentGatewayData: Record<string, unknown>;
    amount: number;
    buyingDate: Date;
    isConfirmed?: boolean;
  };
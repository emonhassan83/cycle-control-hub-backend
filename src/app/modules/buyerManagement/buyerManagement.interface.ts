import { Types } from "mongoose";

export type TBuyer = {
    buyerName: string;
    buyerEmail: string;
    phoneNumber: number;
    buyingDate: Date;
    seller: Types.ObjectId;
    bike: Types.ObjectId;
    isConfirmed?: boolean;
  };


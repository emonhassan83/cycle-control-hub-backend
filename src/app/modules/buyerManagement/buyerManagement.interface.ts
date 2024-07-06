import { Types } from "mongoose";

export type TBuyer = {
    buyer?: Types.ObjectId;
    seller: Types.ObjectId;
    bike: Types.ObjectId;
    buyingDate: Date;
    isConfirmed?: boolean;
  };
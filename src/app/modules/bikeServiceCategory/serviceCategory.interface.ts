import { Types } from "mongoose";

export type TBikeServiceCategory = {
    serviceName: string,
    price: number,
    serviceDetails: string,
    coupon?: Types.ObjectId,
    serviceProvider: Types.ObjectId,
}
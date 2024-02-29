import { Types } from "mongoose";

export type TBikeServiceCategory = {
    serviceName: string,
    price: number,
    serviceDetails: string,
    serviceProvider: Types.ObjectId,
}
import { Types } from "mongoose";

export type TServiceHistory = {
    bike: Types.ObjectId,
    service: Types.ObjectId,
    lastServicingDate: Date,
    nextServicingDate: Date,
    maintenanceRecords: number,
    notes: string,
  }
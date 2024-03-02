import { Types } from "mongoose";

export type TServiceHistory = {
    bike: Types.ObjectId,
    service: Types.ObjectId,
    serviceProvider: Types.ObjectId,
    serviceReceiver: Types.ObjectId,
    serviceBill: number,
    lastServicingDate: Date,
    nextServicingDate: Date,
    maintenanceRecords: number,
    notes: string,
    isConfirmed: boolean,
    isPayed: boolean,
  }
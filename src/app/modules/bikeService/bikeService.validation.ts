import { Types } from "mongoose";

export type MaintenanceHistory = {
    bikeId: Types.ObjectId;
    service: Types.ObjectId;
    lastServicing: Date;
    nextServicing: Date;
    notes: string;
  }
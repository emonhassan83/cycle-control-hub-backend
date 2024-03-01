import { Schema, model } from 'mongoose';
import { TServiceHistory } from './bikeService.interface';

const serviceHistorySchema = new Schema<TServiceHistory>(
  {
    bike: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceCategory'
    },
    lastServicingDate: {
      type: Date,
      required: true
    },
    nextServicingDate: {
        type: Date,
        required: true
    },
    maintenanceRecords: {
        type: Number,
        default: 1,
    },
    notes: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  },
);

export const ServiceHistory = model<TServiceHistory>('ServiceHistory', serviceHistorySchema);

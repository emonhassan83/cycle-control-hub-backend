import { Schema, model } from 'mongoose';
import { TServiceHistory } from './bikeService.interface';

const serviceHistorySchema = new Schema<TServiceHistory>(
  {
    bike: {
      type: Schema.Types.ObjectId,
      ref: 'Bike'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceCategory'
    },
    serviceProvider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    serviceReceiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    serviceBill: {
      type: Number,
      required: true
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
    isConfirmed: {
        type: Boolean,
        default: false
    },
    isPayed: {
        type: Boolean,
        default: false
    },
  },
  {
    timestamps: true,
  },
);

export const ServiceHistory = model<TServiceHistory>('ServiceHistory', serviceHistorySchema);

import { Schema, model } from 'mongoose';
import { TBikeServiceCategory } from './serviceCategory.interface';

const bikeServiceCategorySchema = new Schema<TBikeServiceCategory>(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    serviceDetails: {
      type: String,
      required: true
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
    },
    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

export const ServiceCategory = model<TBikeServiceCategory>('ServiceCategory', bikeServiceCategorySchema);

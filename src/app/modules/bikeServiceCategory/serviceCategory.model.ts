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
    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  },
);

export const ServiceCategory = model<TBikeServiceCategory>('ServiceCategory', bikeServiceCategorySchema);

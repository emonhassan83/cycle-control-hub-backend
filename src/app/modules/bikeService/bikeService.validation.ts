import { z } from 'zod';

const createServiceHistoryValidationSchema = z.object({
  body: z.object({
    bike: z.string(),
    service: z.string(),
    serviceBill: z.number().optional(),
    lastServicingDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: 'Invalid date format' }),
    nextServicingDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: 'Invalid date format' }),
    maintenanceRecords: z.number().optional(),
    notes: z.string(),
    isConfirmed: z.boolean().optional(),
    isPayed: z.boolean().optional(),
  }),
});

const updateServiceHistoryValidationSchema = z.object({
  body: z.object({
    bike: z.string().optional(),
    service: z.string().optional(),
    lastServicingDate: z.string().refine(value => !isNaN(new Date(value).getTime()), {
      message: "Invalid date format",
    }).optional(),
    nextServicingDate: z.string().refine(value => !isNaN(new Date(value).getTime()), {
      message: "Invalid date format",
    }).optional(),
    maintenanceRecords: z.number().optional(),
    notes: z.string().optional(),
  }),
});

export const BikeServiceHistoryValidation = {
  createServiceHistoryValidationSchema,
  updateServiceHistoryValidationSchema,
};

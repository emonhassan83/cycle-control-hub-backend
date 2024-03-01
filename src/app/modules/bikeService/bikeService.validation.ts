import { z } from 'zod';

const createServiceHistoryValidationSchema = z.object({
  body: z.object({
    bike: z.string(),
    service: z.string(),
    lastServicingDate: z.date(),
    nextServicingDate: z.date(),
    maintenanceRecords: z.number().optional(),
    notes: z.string(),
  }),
});

const updateServiceHistoryValidationSchema = z.object({
  body: z.object({
    bike: z.string().optional(),
    service: z.string().optional(),
    lastServicingDate: z.date().optional(),
    nextServicingDate: z.date().optional(),
    maintenanceRecords: z.number().optional(),
    notes: z.string().optional(),
  }),
});

export const BikeServiceHistoryValidation = {
  createServiceHistoryValidationSchema,
  updateServiceHistoryValidationSchema,
};

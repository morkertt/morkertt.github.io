import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const motorcycleSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleSchema>;

export { motorcycleSchema };

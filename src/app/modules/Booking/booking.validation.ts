import { z } from 'zod';
import { Types } from 'mongoose';

const bookingSchema = z.object({
 body: z.object({
    date: z.date(),
    user: z.instanceof(Types.ObjectId),
    car: z.instanceof(Types.ObjectId),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, should be in 24hr format (e.g., "14:00")'),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, should be in 24hr format (e.g., "16:00")'),
    totalCost: z.number().min(0).default(0),
    isBooked: z.enum(['unconfirmed', 'confirmed']).default('unconfirmed')
 })
});

export default bookingSchema;

import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  totalCost: { type: Number, default: 0 },
  isBooked: { type: String, enum: ['unconfirmed', 'confirmed'], default: 'unconfirmed' },
}, {
  timestamps: true
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
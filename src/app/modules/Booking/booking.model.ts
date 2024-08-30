import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, default: null },
  totalCost: { type: Number, default: 0 },
  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
  drivingLicense: { type: String, required: true },
  paymentMethod: { type: String, required: true },
}, {
  timestamps: true
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;

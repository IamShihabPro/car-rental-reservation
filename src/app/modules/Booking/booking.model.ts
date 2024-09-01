import { Query, Schema, model } from 'mongoose';
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
  paymentMethod: { type: String, default: ''},
  transactionId: { type: String },
  isConfirm:  { type: Boolean, required: true, default: false },
  isCancel:  { type: Boolean, required: true, default: false },
  isCarReturn:  { type: Boolean, required: true, default: false },
  isPaid:  { type: Boolean, required: true, default: false },
  isDelete:  { type: Boolean, required: true, default: false },
}, {
  timestamps: true
});


// Middleware to exclude deleted cars
bookingSchema.pre<Query<TBooking, TBooking>>('find', function(next) {
  this.where({ isDeleted: { $ne: true } });
  this.where({ isCancel: { $ne: true } });
  next();
});

bookingSchema.pre<Query<TBooking, TBooking>>('findOne', function(next) {
  this.where({ isDeleted: { $ne: true } });
  this.where({ isCancel: { $ne: true } });
  next();
})

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;

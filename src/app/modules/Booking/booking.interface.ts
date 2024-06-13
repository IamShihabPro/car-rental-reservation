import { Types } from 'mongoose';

export type TBooking = {
  date: Date;
  userId: Types.ObjectId; 
  carId: Types.ObjectId; 
  startTime: string; 
  endTime: string | null;
  totalCost: number; 
}

import { Types } from 'mongoose';

export type TBooking = {
  date: Date;
  user: Types.ObjectId; 
  carId: Types.ObjectId; 
  startTime: string; 
  endTime: string | null;
  totalCost: number; 
}

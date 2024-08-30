import { Types } from 'mongoose';

// export type TidType = 'nid' | 'passport';

export type TBooking = {
  date: Date;
  user: Types.ObjectId; 
  car: Types.ObjectId; 
  startTime: string; 
  endTime: string | null;
  totalCost: number; 
  idType: string;
  idNumber: string;
  drivingLicense: string;
  paymentMethod: string;
  isConfirm: boolean;
  isCancel: boolean
  isDelete: boolean
}

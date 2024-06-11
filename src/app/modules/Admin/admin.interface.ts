import { Types } from "mongoose";

export type TAdmin = {
  user: Types.ObjectId
  name: string;
  email: string;
  // password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
}

import { Types } from "mongoose";

export type TAdmin = {
  name: string;
  user: Types.ObjectId
  email: string;
  // password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
}

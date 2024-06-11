import mongoose from "mongoose";
import { TAdmin } from "../Admin/admin.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Admin } from "../Admin/admin.model";

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {
    role: 'admin',
    password: password,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    
    // Create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    // Set the user reference for the admin payload
    payload.user = newUser[0]._id; 

    // Create an admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin[0];
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message);
  }
};

export const UserServices = {
  createAdminIntoDB,
};

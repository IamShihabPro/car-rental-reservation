import QueryBuilder from "../../builder/QueryBuilder";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const signUpUserIntoDB = async ( payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
  const result = await User.create(payload)
  return result
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const CarSearchableFields = ['name'];
  const carsQuery = new QueryBuilder(
    User.find(),
    query,
  )
    .search(CarSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carsQuery.modelQuery;
  return result;
};

const getSingleUser = async(id: string) =>{
  const result = await User.findById(id)
  return result
}

const getSingleUserByEmail = async(email: string) =>{
  const result = await User.findOne({email})
  return result
}

const updateUserIntoDB = async(id: string, payload: Partial<TUser>)=>{
  const result = await User.findByIdAndUpdate(id, payload, {new: true})
  return result
}

const deleteUserIntoDB = async(id: string) =>{
  const result = await User.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
  return result
}

export const UserServices = {
  signUpUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
  getSingleUserByEmail,
  updateUserIntoDB,
  deleteUserIntoDB
};

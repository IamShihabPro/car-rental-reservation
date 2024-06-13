import QueryBuilder from "../../builder/QueryBuilder";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const signUpUserIntoDB = async ( payload: TUser) => {
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

export const UserServices = {
  signUpUserIntoDB,
  getAllUsersFromDB,
  getSingleUser
};

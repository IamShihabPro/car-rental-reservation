import QueryBuilder from "../../builder/QueryBuilder";
import { TCar } from "./cars.interface";
import Car from "./cars.model";

const createCarsIntoDB = async(payload: TCar)=>{
    const result = await Car.create(payload)
    return result
}

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
    const CarSearchableFields = ['name'];
    const carsQuery = new QueryBuilder(
      Car.find(),
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

const getSingleCar = async(id: string) =>{
    const result = await Car.findById(id)
    return result
}

const updateCarIntoDB = async(id: string, payload: Partial<TCar>)=>{
  const result = await Car.findByIdAndUpdate(id, payload, {new: true})
  return result
}

const deleteCarIntoDB = async(id: string) =>{
  const result = await Car.findByIdAndUpdate(id, {isDeleted: true})
  return result
}


export const CarsServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCar,
    updateCarIntoDB,
    deleteCarIntoDB,
}
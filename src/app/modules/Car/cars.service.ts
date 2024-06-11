import { TCar } from "./cars.interface";
import Car from "./cars.model";

const createCarsIntoDB = async(payload: TCar)=>{
    const result = await Car.create(payload)
    return result
}

export const CarsServices = {
    createCarsIntoDB
}
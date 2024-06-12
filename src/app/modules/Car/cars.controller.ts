import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { CarsServices } from "./cars.service";

const createCars = catchAsync(async(req, res)=>{
    const result = await CarsServices.createCarsIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car is created succesfully',
        data: result,
      });
})

const getAllCars = catchAsync(async(req, res)=>{
    const result = await CarsServices.getAllCarsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars are retrive succesfully',
        data: result,
      });
})

const getSingleCar = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CarsServices.getSingleCar(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars is retrive succesfully',
        data: result,
      });
})


const updateCar = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CarsServices.updateCarIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars is updated succesfully',
        data: result,
      });
})

const deleteCar = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CarsServices.deleteCarIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars is deleted succesfully',
        data: result,
      });
})


export const CarsController = {
    createCars,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar
}
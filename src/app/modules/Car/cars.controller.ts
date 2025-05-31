import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { CarsServices } from "./cars.service";
import AppError from "../../errors/AppError";

const createCars = catchAsync(async(req, res)=>{
    const result = await CarsServices.createCarsIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car created succesfully',
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
        message: 'A Car retrieved successfully',
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


const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await CarsServices.returnCarService(bookingId, endTime);

  if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking update failed');
  }

  sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking updated successfully',
      data: result,
  });
});


export const CarsController = {
    createCars,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar
}
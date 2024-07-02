"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cars_validation_1 = require("./cars.validation");
const cars_controller_1 = require("./cars.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(cars_validation_1.CarsValidations.createCarsValidation), cars_controller_1.CarsController.createCars);
router.put('/return', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), cars_controller_1.CarsController.returnCar);
router.get('/', cars_controller_1.CarsController.getAllCars);
router.get('/:id', cars_controller_1.CarsController.getSingleCar);
router.delete('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), cars_controller_1.CarsController.deleteCar);
router.put('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(cars_validation_1.CarsValidations.updateCarsValidation), cars_controller_1.CarsController.updateCar);
exports.CarsRoutes = router;

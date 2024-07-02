"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
// import globalErrorHandler from './app/middlewares/globalErrorhandler'
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorhandler_1 = require("./app/middlewares/globalErrorhandler");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'] }));
// application routes
app.use('/api', routes_1.default);
// const test = (req: Request, res: Response) => {
//   const a = 10
//   res.send(a)
// }
// app.get('/', test)
// app.get('/', (req: Request, res: Response) => {
//   res.send('Assignment 3')
// })
app.use(globalErrorhandler_1.globalErrorHandler);
// Not found
app.use(notFound_1.default);
exports.default = app;

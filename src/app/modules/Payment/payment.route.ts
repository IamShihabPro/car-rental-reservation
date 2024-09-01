import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post('/', PaymentController.createPayment);
router.post('/confirmation', PaymentController.confirmationPayment);

export const PaymentRoutes = router;

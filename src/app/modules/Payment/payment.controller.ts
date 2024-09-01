import { Request, Response } from 'express';
import catchAsync from '../Utils/catchAsync';
import sendResponse from '../Utils/sendResponse';
import httpStatus from 'http-status';
import { PaymentServices } from './payment.service';


const createPayment = catchAsync(async(req, res)=>{
  const result = await PaymentServices.createPayment(req.body)

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment created succesfully',
      data: result,
    });
})



const confirmationPayment = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  if (!transactionId) {
    return res.status(400).send("Transaction ID is required.");
  }

  const result = await PaymentServices.paymentConfirmation(transactionId as string);

  if (!result) {
    return res.status(404).send("Transaction not found or already confirmed.");
  }

  // Constructing a detailed HTML response
  res.send(`
    <html>
      <head>
        <title>Payment Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #28a745;
            font-size: 24px;
            margin-bottom: 10px;
          }
          p {
            font-size: 18px;
            margin: 5px 0;
          }
          .transaction-info {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment.</p>
          <div class="transaction-info">
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Amount Paid:</strong> ৳${result.totalCost}</p>
            <p><strong>Date:</strong> ${new Date(result.date).toLocaleDateString()}</p>
          </div>
          <p>We appreciate your business!</p>
        </div>
      </body>
    </html>
  `);
});




export const PaymentController = {
  createPayment,
  confirmationPayment
  // confirmPayment,
};

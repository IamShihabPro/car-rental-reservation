import Booking from '../Booking/booking.model';
import { User } from '../User/user.model';
import { initiatePayment } from './patment.utils';



const createPayment = async (payload: any) => {
  if (!payload._id) {
    throw new Error('Booking ID is required');
  }

  // Fetch user information and ensure it's awaited
  const userInfo = await User.findById(payload.user);

  if (!userInfo) {
    throw new Error('User not found');
  }

  const transactionId = `TXN-${Date.now()}`;

  // Extract necessary details for payment
  // const transactionId = payload.transactionId;
  const amount = payload.totalCost;
  const customerName = userInfo.name;
  const customerEmail = userInfo.email;
  const customerAddress = userInfo.address;
  const customerPhone = userInfo.phone;

  // Prepare payment data
  const paymentData = {
    transactionId,
    amount,
    customerName,
    customerEmail,
    customerAddress,
    customerPhone
  };

  // Initiate the payment process
  const paymentSession = await initiatePayment(paymentData);
  console.log('Payment Session:', paymentSession);

  const booking = await Booking.findByIdAndUpdate(payload._id, {transactionId}, {new: true})
  booking?.save()

  return paymentSession;
};


const paymentConfirmation = async (transactionId: string) => {
  const result = await Booking.findOneAndUpdate({transactionId}, {isPaid: true}, {new: true})
  return result
};

export const PaymentServices = {
    createPayment,
    paymentConfirmation
};

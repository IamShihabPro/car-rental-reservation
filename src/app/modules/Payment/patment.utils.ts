// payment.utils.ts
import axios from 'axios';
import dotenv from 'dotenv';
import config from '../../config';

dotenv.config();

export const initiatePayment = async (paymentData: any) => {
    try {
        const response = await axios.post(config.aamar_pay_payment_url!, {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNATURE_KEY,
            tran_id: paymentData.transactionId,
            success_url: `https://car-rental-reservation-production.up.railway.app/api/payment/confirmation?transactionId=${paymentData.transactionId}`,
            fail_url: "http://www.merchantdomain.com/failedpage.html",
            cancel_url: "http://www.merchantdomain.com/cancelpage.html",
            amount: paymentData.amount,
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentData.customerName,
            cus_email: paymentData.customerEmail,
            cus_add1: paymentData.customerAddress,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: paymentData.customerPhone,
            type: "json"
        });

        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw new Error('Payment initiation failed!');
    }
}


// export const initiatePayment = async (paymentData: any) => {
//     try {
//         const response = await axios.post(config.aamar_pay_payment_url!, {
//             store_id: process.env.STORE_ID,
//             signature_key: process.env.SIGNATURE_KEY,
//             tran_id: "12121283",
//             success_url: "http://www.merchantdomain.com/suc esspage.html",
//             fail_url: "http://www.merchantdomain.com/faile dpage.html",
//             cancel_url: "http://www.merchantdomain.com/can cellpage.html",
//             amount: "10.0",
//             currency: "BDT",
//             desc: "Merchant Registration Payment",
//             cus_name: "Name",
//             cus_email: "payer@merchantcusomter.com",
//             cus_add1: "House B-158 Road 22",
//             cus_add2: "Mohakhali DOHS",
//             cus_city: "Dhaka",
//             cus_state: "Dhaka",
//             cus_postcode: "1206",
//             cus_country: "Bangladesh",
//             cus_phone: "+8801704",
//             type: "json"
//         });

//         // console.log(response.data)
//         return response.data;
//     } catch (error) {
//         console.error('Error initiating payment:', error);
//         throw new Error('Payment initiation failed!');
//     }
// }

export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(config.aamar_pay_payment_verify_url!, {
            params: {
                store_id: config.aamar_pay_store_id,
                signature_key: config.aamar_pay_signature_key,
                type: "json",
                request_id: tnxId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw new Error('Payment validation failed!');
    }
}

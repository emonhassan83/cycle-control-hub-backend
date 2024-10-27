import { Buyer } from '../modules/buyerManagement/buyerManagement.model';
import { SaleBike } from '../modules/bikeManagement/bike.model';
import { User } from '../modules/user/user.model';
import { SSLService } from '../modules/SSL/ssl.service';

const initPayment = async (paymentId: string) => {
  const paymentData = await Buyer.findById(paymentId);
  const bike = await SaleBike.findById(paymentData?.bike);
  const buyer = await User.findById(paymentData?.buyer);

  const initPaymentData = {
    amount: paymentData?.amount,
    tran_id: paymentData?.transactionId,
    product_name: bike?.name,
    product_category: bike?.brand,
    cus_name: buyer?.name,
    cus_email: buyer?.email,
    cus_add1: buyer?.address,
    cus_phone: buyer?.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);
  return {
    paymentUrl: result.GatewayPageURL,
  };
};

const validatePayment = async (payload: any) => {
  // if (!payload || !payload.status || payload.status !== 'VALID') {
  //   return {
  //     message: 'Invalid payment!',
  //   };
  // }

  // const response = await SSLService.validatePayment(payload);

  // if (response.status !== 'VALID') {
  //   return {
  //     message: 'Payment Failed!',
  //   }
  // }
console.log(payload);

  const response = payload;

  await Buyer.findOneAndUpdate(
    { transactionId: response?.tran_id },
    { isConfirmed: true, paymentGatewayData: response },
    { new: true },
  );

  return {
    message: "Payment success!",
  };
};

export const PaymentService = {
  initPayment,
  validatePayment,
};

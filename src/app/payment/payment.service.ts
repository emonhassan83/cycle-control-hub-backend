import { Buyer } from '../modules/buyerManagement/buyerManagement.model';
import { SaleBike } from '../modules/bikeManagement/bike.model';
import { User } from '../modules/user/user.model';
import { SSLService } from '../modules/SSL/ssl.service';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const initPayment = async (paymentId: string) => {
  const paymentData = await Buyer.findById(paymentId);
  if (!paymentData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment data not found');
  }

  const bike = await SaleBike.findById(paymentData?.bike);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike data not found');
  }

  const buyer = await User.findById(paymentData?.buyer);
  if (!buyer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Buyer data not found');
  }

  const initPaymentData = {
    amount: (paymentData?.amount ?? 0) + 100,
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
  if (!payload || !payload.status || payload.status !== 'VALID') {
    return {
      message: 'Invalid payment!',
    };
  }

  const response = await SSLService.validatePayment(payload);

  if (response.status !== 'VALID') {
    return {
      message: 'Payment Failed!',
    }
  }

  // const response = payload;

  await Buyer.findOneAndUpdate(
    { transactionId: response?.tran_id },
    { status: "UNPAID", paymentGatewayData: response },
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

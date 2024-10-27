import axios from 'axios';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Buyer } from '../buyerManagement/buyerManagement.model';

const initPayment = async (paymentData: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_pass,
      total_amount: paymentData?.amount,
      currency: 'USD',
      tran_id: paymentData?.tran_id,
      success_url: config.ssl.success_url,
      fail_url: config.ssl.fail_url,
      cancel_url: config.ssl.cancel_url,
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: paymentData?.product_name,
      product_category: paymentData?.product_category,
      product_profile: 'general',
      cus_name: paymentData?.cus_name,
      cus_email: paymentData?.cus_email,
      cus_add1: paymentData?.cus_add1,
      cus_add2: paymentData?.cus_add1,
      cus_city: paymentData?.cus_add1,
      cus_state: paymentData?.cus_add1,
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: paymentData?.cus_phone,
      cus_fax: '01711111111',
      ship_name: 'N/A',
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const response = await axios({
      method: 'POST',
      url: 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    return response.data;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment error occurred');
  }
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_pass}&forment=json`,
    });

    return response.data;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment validation failed!');
  }
};

export const SSLService = {
  initPayment,
  validatePayment,
};

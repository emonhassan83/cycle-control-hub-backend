const initPayment = async (paymentId: string) => {
    console.log(paymentId);
    
  };

  const validatePayment = async (payload: any) => {
    console.log(payload);
    
  }

  export const PaymentService = {
    initPayment,
    validatePayment,
  };
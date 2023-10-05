import React, { createContext, useContext } from "react";
import { PAYMENT_STATUS } from "../constants/payment";

export const PaymentContext = createContext({
  orderId: null,
  paymentStatus: PAYMENT_STATUS.PENDING,
  getOrderId: () => {},
  setOrderId: (orderId) => {},
  setPaymentStatus: (status) => {},
});

export const PaymentProvider = PaymentContext.Provider;

export default function usePayment() {
  return useContext(PaymentContext);
}

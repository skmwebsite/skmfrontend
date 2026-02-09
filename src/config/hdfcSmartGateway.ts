export const HDFC_SMART_GATEWAY_CONFIG = {
  MERCHANT_ID: process.env.HDFC_MERCHANT_ID || "44166",
  KEY_UUID: process.env.HDFC_KEY_UUID || "key_e375d9d40fe34fe8b4a78ecdeb6f7c14",
  CLIENT_ID: process.env.HDFC_CLIENT_ID || "44166",

  BASE_URL: "https://smartgateway.hdfc.bank.in",

  TEST: {
    baseUrl: "https://smartgateway.hdfcuat.bank.in",
    getCheckoutUrl: (orderId: string) =>
      `https://smartgateway.hdfcuat.bank.in/merchant/ipay/${orderId}/payment-page`,
    merchantId: process.env.HDFC_MERCHANT_ID || "44166",
  },
  PRODUCTION: {
    baseUrl: "https://smartgateway.hdfc.bank.in",
    getCheckoutUrl: (orderId: string) =>
      `https://smartgateway.hdfc.bank.in/merchant/ipay/${orderId}/payment-page`,
    merchantId: process.env.HDFC_MERCHANT_ID || "44166",
  },

  REDIRECT_URLS: {
    success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
    cancel: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
  },
};

export const isProduction = process.env.NODE_ENV === "production";

export const getHDFCConfig = () =>
  isProduction
    ? HDFC_SMART_GATEWAY_CONFIG.PRODUCTION
    : HDFC_SMART_GATEWAY_CONFIG.TEST;

export interface PaymentResponse {
  success: boolean;
  data?: {
    order_id: string;
    paymentSessionId: string;
    status: "NEW" | "INITIATED" | "COMPLETED" | "FAILED" | "CANCELLED";
    amount: number;
    item_count: number;
  };
  message?: string;
}

// Type for payment callback
export interface PaymentCallback {
  paymentSessionId: string;
  orderId: string;
  status: string;
  amount: number;
  transactionId?: string;
  errorMessage?: string;
}

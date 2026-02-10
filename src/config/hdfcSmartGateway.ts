export const HDFC_SMART_GATEWAY_CONFIG = {
  MERCHANT_ID: process.env.HDFC_MERCHANT_ID,
  KEY_UUID: process.env.HDFC_KEY_UUID,
  CLIENT_ID: process.env.HDFC_CLIENT_ID,

  BASE_URL: "https://smartgateway.hdfcuat.bank.in",

  TEST: {
    baseUrl: "https://smartgateway.hdfcuat.bank.in",
    merchantId: process.env.HDFC_MERCHANT_ID,
  },
  PRODUCTION: {
    baseUrl: "https://smartgateway.hdfc.bank.in",
    merchantId: process.env.HDFC_MERCHANT_ID,
  },

  REDIRECT_URLS: {
    success: `${process.env.NEXT_PUBLIC_BASE_URL}payment/success`,
    failure: `${process.env.NEXT_PUBLIC_BASE_URL}payment/failure`,
    cancel: `${process.env.NEXT_PUBLIC_BASE_URL}payment/cancel`,
  },
};

export const isProduction = process.env.NODE_ENV === "production";

export const getHDFCConfig = () =>
  isProduction
    ? HDFC_SMART_GATEWAY_CONFIG.PRODUCTION
    : HDFC_SMART_GATEWAY_CONFIG.TEST;

export interface CreateOrderResponse {
  id: string;
  order_id: string;
  payment_links: {
    web: string;
  };
  sdk_payload: {
    currTime: string;
    expiry: string;
    payload: {
      action: string;
      amount: string;
      clientAuthToken: string;
      clientId: string;
      currency: string;
      customerEmail: string;
      customerId: string;
      customerPhone: string;
      merchantId: string;
      orderId: string;
      returnUrl: string;
    };
    requestId: string;
    service: string;
  };
  status: "NEW" | "INITIATED" | "COMPLETED" | "FAILED" | "CANCELLED";
}

export interface PaymentCallback {
  paymentSessionId: string;
  orderId: string;
  status: string;
  amount: number;
  transactionId?: string;
  errorMessage?: string;
}

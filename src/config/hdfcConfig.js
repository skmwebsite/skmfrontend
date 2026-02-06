export const HDFC_CONFIG = {
  TEST: {
    merchantId: process.env.NEXT_PUBLIC_HDFC_TEST_MERCHANT_ID,
    accessCode: process.env.NEXT_PUBLIC_HDFC_TEST_ACCESS_CODE,
    workingKey: process.env.NEXT_PUBLIC_HDFC_TEST_WORKING_KEY,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-response`,
    cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    apiUrl: "https://test.ccavenue.com/transaction/transaction.do",
  },
  PRODUCTION: {
    merchantId: process.env.NEXT_PUBLIC_HDFC_PROD_MERCHANT_ID,
    accessCode: process.env.NEXT_PUBLIC_HDFC_PROD_ACCESS_CODE,
    workingKey: process.env.NEXT_PUBLIC_HDFC_PROD_WORKING_KEY,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-response`,
    cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    apiUrl: "https://secure.ccavenue.com/transaction/transaction.do",
  },
};

export const isProduction = process.env.NODE_ENV === "production";
export const getConfig = () =>
  isProduction ? HDFC_CONFIG.PRODUCTION : HDFC_CONFIG.TEST;

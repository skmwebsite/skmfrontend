import {
  HDFC_SMART_GATEWAY_CONFIG,
  PaymentCallback,
  isProduction,
} from "@/src/config/hdfcSmartGateway";

/**
 * Initiate payment by redirecting to Juspay HDFC SmartGateway checkout
 * @param paymentSessionId - Order ID from backend (e.g., ordeh_xxx)
 * @param orderId - Order ID for reference
 * @param amount - Payment amount (not used for URL)
 */
export const initiateHDFCPayment = (
  paymentSessionId: string,
  orderId: string,
  amount: number,
): void => {
  if (!paymentSessionId) {
    throw new Error("Order ID is required for payment");
  }

  // Get the correct config based on environment
  const config = isProduction
    ? HDFC_SMART_GATEWAY_CONFIG.PRODUCTION
    : HDFC_SMART_GATEWAY_CONFIG.TEST;

  // Juspay HDFC checkout URL format: /merchant/ipay/{orderId}/payment-page
  const paymentUrl = config.getCheckoutUrl(paymentSessionId);

  console.log("Redirecting to Juspay HDFC:", paymentUrl);

  // Redirect to Juspay HDFC Gateway
  window.location.href = paymentUrl;
};

/**
 * Store payment session details in sessionStorage for callback handling
 */
export const storePaymentSession = (
  sessionId: string,
  orderId: string,
): void => {
  const paymentSession = {
    sessionId,
    orderId,
    timestamp: new Date().toISOString(),
  };
  sessionStorage.setItem("hdfcPaymentSession", JSON.stringify(paymentSession));
};

/**
 * Retrieve stored payment session details
 */
export const getPaymentSession = (): {
  sessionId: string;
  orderId: string;
  timestamp: string;
} | null => {
  const session = sessionStorage.getItem("hdfcPaymentSession");
  return session ? JSON.parse(session) : null;
};

/**
 * Clear payment session from storage
 */
export const clearPaymentSession = (): void => {
  sessionStorage.removeItem("hdfcPaymentSession");
};

/**
 * Parse payment callback response from URL query parameters
 */
export const parsePaymentCallback = (
  searchParams: URLSearchParams,
): PaymentCallback | null => {
  const paymentSessionId = searchParams.get("sessionId");
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");
  const amount = searchParams.get("amount");
  const transactionId =
    searchParams.get("txnId") || searchParams.get("transactionId");
  const errorMessage = searchParams.get("error");

  if (!paymentSessionId || !orderId) {
    return null;
  }

  return {
    paymentSessionId,
    orderId,
    status: status || "unknown",
    amount: amount ? parseInt(amount) : 0,
    transactionId: transactionId || undefined,
    errorMessage: errorMessage || undefined,
  };
};

/**
 * Validate payment response signature (if backend provides one)
 * You may need to implement signature verification based on HDFC's documentation
 */
export const validatePaymentResponse = (
  data: PaymentCallback,
  signature?: string,
): boolean => {
  // TODO: Implement signature validation based on HDFC guidelines
  // This usually involves verifying HMAC or other cryptographic signature
  return true;
};

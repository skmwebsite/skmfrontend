import { PaymentCallback } from "@/src/config/hdfcSmartGateway";

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

export const getPaymentSession = (): {
  sessionId: string;
  orderId: string;
  timestamp: string;
} | null => {
  const session = sessionStorage.getItem("hdfcPaymentSession");
  return session ? JSON.parse(session) : null;
};

export const clearPaymentSession = (): void => {
  sessionStorage.removeItem("hdfcPaymentSession");
};

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

export const validatePaymentResponse = (): boolean => {
  return true;
};

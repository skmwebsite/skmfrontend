"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  parsePaymentCallback,
  clearPaymentSession,
} from "@/src/utils/paymentUtils";
import { frontendApi } from "@/src/api/api";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState("processing");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Parse the callback parameters
        const paymentData = parsePaymentCallback(searchParams);

        if (!paymentData) {
          setPaymentStatus("error");
          toast.error("Invalid payment response");
          return;
        }

        console.log("Payment callback data:", paymentData);

        // Backend will handle payment confirmation via webhook
        // No need to call confirmPayment API anymore

        if (
          paymentData.status === "COMPLETED" ||
          paymentData.status === "SUCCESSFUL"
        ) {
          setPaymentStatus("success");
          setOrderDetails(paymentData);
          toast.success("Payment successful! Your order has been placed.");

          // Clear stored payment session
          clearPaymentSession();
        } else {
          setPaymentStatus("error");
          toast.error(
            "Payment was not successful. Status: " + paymentData.status,
          );
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        setPaymentStatus("error");
        toast.error("Error processing payment");
      }
    };

    processPayment();
  }, [searchParams]);

  if (paymentStatus === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">
            Processing Payment...
          </h1>
          <p className="text-gray-500 mt-2">
            Please wait while we confirm your payment
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. Your order is being
            prepared.
          </p>

          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Order ID:</span>{" "}
                  {orderDetails.order_id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span> ₹
                  {orderDetails.amount}
                </p>
                {orderDetails.transaction_id && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {orderDetails.transaction_id}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/shop"
              className="block w-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again
          or contact support.
        </p>

        <div className="space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
          >
            Return to Cart
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

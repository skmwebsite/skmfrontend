"use client";

import Link from "next/link";
import { useEffect } from "react";
import { clearPaymentSession } from "@/src/utils/paymentUtils";
import toast from "react-hot-toast";

export default function PaymentCancel() {
  useEffect(() => {
    clearPaymentSession();
    toast(
      "Payment cancelled. Please try again if you wish to complete your order.",
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0 0v2m0-6v-2m0-2v2m0 0v-2"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-2">
          You have cancelled the payment process.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Your order has been saved and you can complete the payment later.
        </p>

        <div className="space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
          >
            Back to Cart
          </Link>
          <Link
            href="/shop"
            className="block w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-gray-400 transition"
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

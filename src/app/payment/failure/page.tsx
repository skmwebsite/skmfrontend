"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { clearPaymentSession } from "@/src/utils/paymentUtils";
import toast from "react-hot-toast";

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error") || "Payment processing failed";

  useEffect(() => {
    clearPaymentSession();
    toast.error(errorMessage);
  }, [errorMessage]);

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
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <p className="text-sm text-gray-500 mb-6">
          Please try again with a different payment method or contact our
          support team.
        </p>

        <div className="space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
          >
            Return to Cart
          </Link>
          <Link
            href="/contact-us"
            className="block w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-gray-400 transition"
          >
            Contact Support
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

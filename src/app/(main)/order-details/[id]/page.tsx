"use client";

import { useParams } from "next/navigation";
import { frontendApi } from "@/src/api/api";
import Lottie from "lottie-react";
import successAnimation from "@public/lottie/success.json";
import failedAnimation from "@public/lottie/success.json";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const {
    data: orderDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!id) throw new Error("Order ID is required");
      const response = await frontendApi.getOrderDetails(id as string);

      console.log("response:::::::::::", response);
      return {
        transaction_id: response.data?.transaction_id,
        order_id: response.data?.order_id,
        items_count: response.data?.items_count || 0,
        amount: response.data?.total_amount,
        order_date: new Date(response.data?.created_at).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        ),
        status: response.data?.status,
        order_status: response.data?.order_status,
      };
    },
    enabled: !!id,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen ~pt-[1rem]/[1.5rem] flex flex-col items-center justify-center ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem]">
        <div className="space-y-4 w-full max-w-md">
          <div className="~size-[10rem]/[16rem] mx-auto">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-[#F8F5EE] rounded-full"></div>
              <div className="absolute inset-0 border-4 border-main rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="~text-[1.5rem]/[2rem] font-bold text-[#000000]">
              Loading your order...
            </h2>
            <p className="~text-[0.875rem]/[1rem] pt-1 ~pb-[1rem]/[1.5rem] text-[#1A1A1ABF] max-w-md">
              Please wait while we fetch your order details
            </p>
          </div>

          <div className="bg-white ~rounded-[0.74875rem]/[1rem] relative overflow-hidden p-[1.5rem]">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-2 bg-[#F8F5EE] rounded-full animate-pulse"></div>
              <div className="w-full h-4 bg-[#F8F5EE] rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-[#F8F5EE] rounded animate-pulse"></div>
              <div className="w-1/2 h-4 bg-[#F8F5EE] rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error || !orderDetails) {
    if (error && !isLoading) {
      toast.error("Could not load order details");
    }

    return (
      <div className="min-h-screen ~pt-[1rem]/[1.5rem] flex flex-col items-center justify-center ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem]">
        <div className="space-y-4 w-full max-w-md">
          <div className="~size-[10rem]/[16rem] mx-auto">
            <div className="w-full h-full flex items-center justify-center">
              <div className="~size-[5rem]/[6rem] bg-[#FEE] rounded-full flex items-center justify-center">
                <svg
                  className="~w-[2.5rem]/[3rem] ~h-[2.5rem]/[3rem] text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="~text-[1.5rem]/[2rem] font-bold text-[#000000]">
              Order Not Found
            </h2>
            <p className="~text-[0.875rem]/[1rem] pt-1 ~pb-[1rem]/[1.5rem] text-[#1A1A1ABF] max-w-md">
              {error?.message || "We couldn't find this order in our records"}
            </p>
          </div>

          <div className="bg-white ~rounded-[0.74875rem]/[1rem] relative overflow-hidden ">
            <div className="bg-main ">
              <h2 className="text-white py-[0.25rem] ~text-[1rem]/[1.25rem] font-medium px-[1.5rem]">
                Error Details
              </h2>
            </div>
            <div className="bg-[#F8F5EE] ~space-y-[0.25rem]/[0.5rem] ~text-[0.875rem]/[1rem] py-[1rem] px-[1rem] rounded-[0.5rem] ">
              <div className="flex flex-col space-y-2 text-center">
                <p className="text-gray-600">
                  The order you're looking for doesn't exist or you don't have
                  access to it.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F5EE] p-2 rounded-[0.5rem]">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-semibold ~text-[0.875rem]/[1rem] text-black">
                  What to do next?
                </h3>
                <p className="~text-[0.75rem]/[0.875rem]">
                  Check your order history or contact support if you believe
                  this is an error.
                </p>
              </div>
            </div>
          </div>

          <div className="grid ">
            <Link
              href="/"
              className=" ~text-[0.75rem]/[1rem] group overflow-hidden relative w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ~pt-[1rem]/[1.5rem] flex flex-col items-center justify-center ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem]">
      <div className="space-y-4">
        {orderDetails.order_status !== null ? (
          <div className="~size-[10rem]/[16rem] mx-auto">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
        ) : (
          <div className="~size-[10rem]/[16rem] mx-auto">
            <Lottie animationData={failedAnimation} loop={false} />
          </div>
        )}{" "}
        <div className="flex flex-col items-center text-center">
          <h2 className="~text-[1.5rem]/[2rem] font-bold text-[#000000]">
            {orderDetails.order_status !== null
              ? "Thank you for your order!"
              : "Order Failed"}
          </h2>

          <p className="~text-[0.875rem]/[1rem] pt-1 ~pb-[1rem]/[1.5rem] text-[#1A1A1ABF] max-w-md">
            {orderDetails.order_status !== null
              ? "Your order has been successfully placed. We'll send shipping updates and details to your email as soon as your order ships."
              : "There was an issue with your order. Please try again or contact support."}
          </p>
        </div>
        {orderDetails.order_status !== null && (
          <div className="bg-white ~rounded-[0.74875rem]/[1rem] relative overflow-hidden">
            <div className="bg-main">
              <h2 className="text-white py-[0.25rem] ~text-[1rem]/[1.25rem] font-medium px-[1.5rem]">
                Order Details
              </h2>
            </div>

            <div className="bg-[#F8F5EE] ~space-y-[0.25rem]/[0.5rem] ~text-[0.875rem]/[1rem] py-[1rem] px-[1rem] rounded-[0.5rem]">
              <div className="flex justify-between">
                <span className="font-semibold">Order ID:</span>
                <span>#{orderDetails.order_id}</span>
              </div>
              {orderDetails.transaction_id && (
                <div className="flex justify-between">
                  <span className="font-semibold">Transaction ID:</span>
                  <span>#{orderDetails.transaction_id}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">Order Date:</span>
                <span>{orderDetails.order_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-main">
                  ₹ {orderDetails.amount}
                </span>
              </div>
            </div>
          </div>
        )}
        {orderDetails.order_status !== null && (
          <div className="bg-[#F8F5EE] p-2 rounded-[0.5rem]">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-semibold ~text-[0.875rem]/[1rem] text-black">
                  Confirmation Sent
                </h3>
                <p className="~text-[0.75rem]/[0.875rem]">
                  We've sent a confirmation email with your order details. Your
                  order will be processed shortly.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 ~gap-[0.75rem]/[1rem]">
          <Link
            href="/shop"
            className="~text-[0.75rem]/[1rem] h-fit group overflow-hidden relative w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-[#F8F5EE] font-medium text-black py-[0.78125rem]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Continue Shopping
            </span>
          </Link>
          <Link
            href="/"
            className="relative ~text-[0.75rem]/[1rem] group overflow-hidden  w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

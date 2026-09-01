"use client";

import Arrow from "@/src/components/svg/Arrow";
import Location from "@/src/components/svg/Location";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ORDER_STATUS_META,
  ORDER_TRACKER,
  TOrderHistory,
  TOrderItem,
} from "../_data/orders";

const VISIBLE_ITEMS = 2;

const OrderItemRow = ({ item }: { item: TOrderItem }) => (
  <div className="flex ~gap-[0.75rem]/[1.25rem] ~py-[0.75rem]/[1rem] border-b border-b-[#00000014] last:border-b-0">
    <div className="~size-[3.25rem]/[5rem] shrink-0 relative overflow-hidden rounded-[0.5rem] bg-cream">
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="80px"
        className="object-contain p-[0.25rem]"
      />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between ~gap-[0.5rem]/[1rem]">
        <div className="min-w-0">
          <p className="block truncate font-medium leading-[120%] tracking-[-0.03em] ~text-[0.875rem]/[1.125rem]">
            {item.name}
          </p>
        </div>
        <p className="shrink-0 font-semibold tracking-[-0.03em] leading-[120%] ~text-[0.75rem]/[1rem]">
          ₹{item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-wrap items-center ~gap-[0.375rem]/[0.5rem] ~pt-[0.4rem]/[0.625rem]">
        {item.variant && (
          <span className="~text-[0.625rem]/[0.875rem] rounded-[0.3125rem] font-medium tracking-[-0.03em] leading-[120%] bg-[#F8F5EE] ~px-[0.5rem]/[0.875rem] ~py-[0.25rem]/[0.375rem]">
            {item.variant}
          </span>
        )}
        <span className="~text-[0.625rem]/[0.875rem] rounded-[0.3125rem] font-medium tracking-[-0.03em] leading-[120%] bg-[#F8F5EE] ~px-[0.5rem]/[0.875rem] ~py-[0.25rem]/[0.375rem]">
          Qty {item.quantity}
        </span>
        {item.isCustomized && (
          <span className="~text-[0.625rem]/[0.875rem] rounded-[0.3125rem] font-medium tracking-[-0.03em] leading-[120%] bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white ~px-[0.5rem]/[0.875rem] ~py-[0.25rem]/[0.375rem]">
            Customized
          </span>
        )}
      </div>
    </div>
  </div>
);

const OrderTracker = ({ status }: { status: TOrderHistory["status"] }) => {
  const currentStep = ORDER_TRACKER.findIndex((step) => step.key === status);

  return (
    <div className="flex items-start">
      {ORDER_TRACKER.map((step, index) => {
        const isDone = index <= currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.key} className="flex-1 flex flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={`h-[2px] flex-1 ${
                  index === 0
                    ? "bg-transparent"
                    : index <= currentStep
                      ? "bg-main"
                      : "bg-[#00000014]"
                }`}
              />
              <div
                className={`~size-[0.875rem]/[1.125rem] relative shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  isDone ? "bg-main" : "bg-[#EBEBEB]"
                }`}
              >
                {isCurrent && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-main/40"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                {isDone && (
                  <svg
                    className="~size-[0.5rem]/[0.625rem] text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div
                className={`h-[2px] flex-1 ${
                  index === ORDER_TRACKER.length - 1
                    ? "bg-transparent"
                    : index < currentStep
                      ? "bg-main"
                      : "bg-[#00000014]"
                }`}
              />
            </div>
            <p
              className={`~text-[0.5625rem]/[0.75rem] text-center ~pt-[0.375rem]/[0.5rem] leading-[120%] tracking-[-0.02em] ${
                isDone ? "font-semibold text-main" : "text-[#1A1A1ABF]"
              }`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const OrderCard = ({ order }: { order: TOrderHistory }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const status = ORDER_STATUS_META[order.status];
  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const hiddenCount = order.items.length - VISIBLE_ITEMS;
  const visibleItems = isExpanded
    ? order.items
    : order.items.slice(0, VISIBLE_ITEMS);

  return (
    <motion.div
      layout
      className="bg-white border border-[#00000014] ~rounded-[0.74875rem]/[1rem] overflow-hidden"
    >
      {/* Header strip */}
      <div className="bg-[#F8F5EE] ~px-[1rem]/[1.5rem] ~py-[0.75rem]/[1rem] flex flex-wrap items-center justify-between ~gap-[0.5rem]/[1rem]">
        <div>
          <div className="flex items-center ~gap-[0.5rem]/[0.75rem]">
            <p className="font-semibold leading-[120%] tracking-[-0.03em] ~text-[0.875rem]/[1.125rem]">
              #{order.order_id}
            </p>
            <span
              className={`flex items-center gap-[0.375rem] rounded-full ~px-[0.5rem]/[0.75rem] ~py-[0.15rem]/[0.25rem] ~text-[0.625rem]/[0.75rem] font-semibold leading-[130%] tracking-[-0.02em] ${status.badge}`}
            >
              <span className={`size-[0.375rem] rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          <p className="~pt-[0.25rem]/[0.375rem] ~text-[0.6875rem]/[0.875rem] text-[#1A1A1ABF] leading-[130%] tracking-[-0.02em]">
            Placed on {order.placed_on} • {order.order_type === 1 ? "Delivery" : "Pickup"}
          </p>
        </div>

        <div className="text-right">
          <p className="~text-[0.625rem]/[0.75rem] uppercase tracking-[0.04em] text-[#1A1A1ABF] font-semibold">
            Total
          </p>
          <p className="font-bold text-main leading-[120%] tracking-[-0.03em] ~text-[1rem]/[1.25rem]">
            ₹{order.total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Status note */}
      <div className="~px-[1rem]/[1.5rem] ~pt-[0.75rem]/[1rem]">
        <p className="~text-[0.6875rem]/[0.875rem] leading-[130%] tracking-[-0.02em] text-[#1A1A1ABF]">
          {order.status_note}
        </p>
      </div>

      {/* Items */}
      <div className="~px-[1rem]/[1.5rem]">
        {visibleItems.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
      </div>

      {!isExpanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="~px-[1rem]/[1.5rem] ~pb-[0.5rem]/[0.75rem] pt-[0.5rem] ~text-[0.75rem]/[0.875rem] font-medium text-main hover:underline"
        >
          + {hiddenCount} more {hiddenCount === 1 ? "item" : "items"}
        </button>
      )}

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="~px-[1rem]/[1.5rem] ~pt-[1rem]/[1.5rem] ~space-y-[1rem]/[1.5rem]">
              {order.status !== "Cancelled" && (
                <div className="bg-[#F8F5EE] ~rounded-[0.5rem]/[0.75rem] ~px-[0.75rem]/[1.25rem] ~py-[1rem]/[1.25rem]">
                  <OrderTracker status={order.status} />
                </div>
              )}

              <div className="grid md:grid-cols-2 ~gap-[0.75rem]/[1rem]">
                <div className="border border-[#00000014] ~rounded-[0.5rem]/[0.75rem] ~p-[0.75rem]/[1rem]">
                  <div className="flex items-center gap-[0.5rem] ~pb-[0.5rem]/[0.625rem]">
                    <Location className="w-[0.75rem] shrink-0 text-main" />
                    <p className="~text-[0.75rem]/[0.875rem] font-semibold leading-[120%] tracking-[-0.03em]">
                      {order.order_type === 1
                        ? "Delivery Address"
                        : "Pickup Location"}
                    </p>
                  </div>
                  {order.address ? (
                    <p className="~text-[0.6875rem]/[0.875rem] leading-[150%] tracking-[-0.02em] text-[#1A1A1ABF]">
                      {order.address}
                    </p>
                  ) : (
                    <p className="~text-[0.6875rem]/[0.875rem] leading-[150%] tracking-[-0.02em] text-[#1A1A1ABF]">
                      Collect from our store.
                    </p>
                  )}
                  <p className="~pt-[0.5rem]/[0.625rem] ~text-[0.6875rem]/[0.875rem] leading-[130%] tracking-[-0.02em] text-[#1A1A1ABF]">
                    <span className="font-semibold text-[#1A1A1A]">
                      Payment:
                    </span>{" "}
                    {order.payment_method}
                  </p>
                </div>

                <div className="border border-[#00000014] ~rounded-[0.5rem]/[0.75rem] ~p-[0.75rem]/[1rem] ~space-y-[0.375rem]/[0.5rem] ~text-[0.6875rem]/[0.875rem] leading-[130%] tracking-[-0.02em]">
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1ABF]">
                      Subtotal ({totalUnits} {totalUnits === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium">
                      ₹{order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-[#1E8E4E]">
                      <span>Discount</span>
                      <span className="font-medium">
                        -₹{order.discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1ABF]">
                      {order.order_type === 1 ? "Delivery" : "Pickup"}
                    </span>
                    <span className="font-medium">
                      {order.delivery_fee > 0
                        ? `₹${order.delivery_fee.toFixed(2)}`
                        : "Free"}
                    </span>
                  </div>
                  {order.tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1ABF]">Tax</span>
                      <span className="font-medium">
                        ₹{order.tax.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="h-[1px] bg-[#00000014] !my-[0.625rem]" />
                  <div className="flex justify-between ~text-[0.75rem]/[1rem] font-semibold">
                    <span>
                      {order.payment_status === "Paid" ? "Total Paid" : "Total"}
                    </span>
                    <span className="text-main">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer actions */}
      <div className="~px-[1rem]/[1.5rem] ~py-[0.75rem]/[1rem] ~mt-[0.75rem]/[1rem] border-t border-t-[#00000014] flex flex-wrap items-center justify-between ~gap-[0.75rem]/[1rem]">
        <p className="~text-[0.6875rem]/[0.875rem] text-[#1A1A1ABF] leading-[130%] tracking-[-0.02em]">
          {totalUnits} {totalUnits === 1 ? "item" : "items"} •{" "}
          {order.items.length}{" "}
          {order.items.length === 1 ? "product" : "products"}
        </p>

        <div className="flex items-center ~gap-[0.5rem]/[0.75rem] max-sm:w-full">
          <Link
            prefetch={false}
            href="/shop"
            className="~text-[0.6875rem]/[0.875rem] group overflow-hidden relative max-sm:flex-1 flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-[#F8F5EE] font-medium text-black ~px-[1rem]/[1.5rem] ~py-[0.5rem]/[0.625rem]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Buy Again
            </span>
            <Arrow className="relative z-10 ~size-[0.75rem]/[0.875rem] group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
          </Link>

          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            className="~text-[0.6875rem]/[0.875rem] group overflow-hidden relative max-sm:flex-1 flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white ~px-[1rem]/[1.5rem] ~py-[0.5rem]/[0.625rem]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-10">
              {isExpanded ? "Hide Details" : "View Details"}
            </span>
            <svg
              className={`relative z-10 ~size-[0.625rem]/[0.75rem] shrink-0 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              viewBox="0 0 19 10"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.571}
                d="m17.126 1.286-6.52 6.52c-.77.77-2.03.77-2.8 0l-6.52-6.52"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;

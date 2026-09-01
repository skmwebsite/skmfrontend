"use client";

import { frontendApi } from "@/src/api/api";
import Arrow from "@/src/components/svg/Arrow";
import { useAuth } from "@/src/hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import emptyBag from "@public/images/empty-bag.png";
import { ORDER_FILTERS, TOrderStatus, mapOrder } from "../_data/orders";
import OrderCard from "./OrderCard";

type TFilter = "all" | TOrderStatus;

const PER_PAGE = 10;

const OrdersList = () => {
  const [activeFilter, setActiveFilter] = useState<TFilter>("all");
  const { isLoggedIn } = useAuth();

  const {
    data,
    error,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["order-history"],
    queryFn: ({ pageParam }) =>
      frontendApi.getOrderHistory({ page: pageParam, per_page: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined,
    enabled: isLoggedIn,
    retry: (failureCount, err) =>
      axios.isAxiosError(err) && err.response?.status === 401
        ? false
        : failureCount < 2,
    staleTime: 60 * 1000,
  });

  const orders = useMemo(
    () => (data?.pages ?? []).flatMap((page) => page.data.map(mapOrder)),
    [data],
  );

  const totalOrders = data?.pages?.[0]?.meta.total ?? orders.length;

  const stats = useMemo(() => {
    const delivered = orders.filter(
      (order) => order.status === "Delivered",
    ).length;
    const inTransit = orders.filter((order) =>
      ["Pending", "Confirmed", "Shipped"].includes(order.status),
    ).length;
    const spent = orders
      .filter((order) => order.status !== "Cancelled")
      .reduce((total, order) => total + order.total, 0);

    return [
      { label: "Total Orders", value: String(totalOrders) },
      { label: "Delivered", value: String(delivered) },
      { label: "In Progress", value: String(inTransit) },
      { label: "Total Spent", value: `₹${spent.toFixed(0)}` },
    ];
  }, [orders, totalOrders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [orders, activeFilter]);

  const isUnauthorized =
    axios.isAxiosError(error) && error.response?.status === 401;

  const wrapperClass =
    "~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem] ~pt-[1.5rem]/[3rem] ~pb-[3rem]/[5rem]";

  // Logged out, or the session expired mid-session. There is no standalone
  // login form — customers sign in through the cart/checkout flow — so point
  // them to the shop instead of a dead sign-in button.
  if (!isLoggedIn || isUnauthorized) {
    return (
      <div className={wrapperClass}>
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <Image
            src={emptyBag}
            alt=""
            className="~size-[7rem]/[10rem] object-contain"
          />
          <p className="~text-[1rem]/[1.5rem] ~pt-[1rem]/[1.5rem] font-medium leading-[120%] tracking-[-0.03em] text-[#181D27]">
            No orders yet
          </p>
          <p className="~pt-[0.25rem]/[0.5rem] ~text-[0.75rem]/[1rem] text-[#1A1A1ABF] tracking-[-0.02em]">
            Once you place an order it will show up here.
          </p>
          <Link
            prefetch={false}
            href="/shop"
            className="~mt-[1rem]/[1.5rem] relative overflow-hidden rounded-full bg-main text-white p-[0.125rem] ~w-[6.5625rem]/[9rem] flex items-center justify-end ~text-[0.75rem]/[1rem] tracking-[-0.03em] leading-[120%] font-medium group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="absolute z-10 ~left-[0.5rem]/[1rem]">
              Shop now
            </span>
            <div className="relative z-10 ~w-[2rem]/[2.5rem] ~h-[2rem]/[2.5rem] flex justify-center items-center bg-white rounded-full transition-all duration-700 ease-in-out">
              <Arrow className="~size-[1rem]/[1.5rem] text-main absolute right-[0.5rem] transition-transform duration-700 ease-in-out group-hover:-rotate-45" />
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className={wrapperClass}>
        <div className="grid grid-cols-2 lg:grid-cols-4 ~gap-[0.5rem]/[1rem]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#F8F5EE] ~rounded-[0.74875rem]/[1rem] ~px-[1rem]/[1.5rem] ~py-[0.875rem]/[1.25rem] animate-pulse ~h-[4.5rem]/[6rem]"
            />
          ))}
        </div>
        <div className="~pt-[1.5rem]/[2.5rem] flex flex-col ~gap-[0.75rem]/[1.25rem]">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border border-[#00000014] ~rounded-[0.74875rem]/[1rem] ~h-[12rem]/[16rem] bg-[#F8F5EE]/60 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={wrapperClass}>
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <p className="~text-[1rem]/[1.5rem] font-medium leading-[120%] tracking-[-0.03em] text-[#181D27]">
            We couldn&rsquo;t load your orders
          </p>
          <p className="~pt-[0.25rem]/[0.5rem] ~text-[0.75rem]/[1rem] text-[#1A1A1ABF] tracking-[-0.02em]">
            Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="~mt-[1rem]/[1.5rem] ~text-[0.6875rem]/[0.875rem] group overflow-hidden relative flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white ~px-[1.5rem]/[2rem] ~py-[0.5rem]/[0.625rem]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-10">Try again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 ~gap-[0.5rem]/[1rem]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#F8F5EE] ~rounded-[0.74875rem]/[1rem] ~px-[1rem]/[1.5rem] ~py-[0.875rem]/[1.25rem]"
          >
            <p className="~text-[0.625rem]/[0.75rem] uppercase font-semibold tracking-[0.04em] text-[#1A1A1ABF]">
              {stat.label}
            </p>
            <p className="~pt-[0.25rem]/[0.5rem] font-semibold leading-[120%] tracking-[-0.04em] ~text-[1.25rem]/[2rem] text-main">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="~pt-[1.5rem]/[2.5rem] flex items-center justify-between ~gap-[1rem]/[1.5rem] flex-wrap">
        <h5 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[130%]">
          Recent Orders
        </h5>
        <div className="no-scrollbar flex ~gap-[0.375rem]/[0.5rem] overflow-x-auto max-md:w-full">
          {ORDER_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`relative shrink-0 rounded-full ~px-[0.75rem]/[1rem] ~py-[0.375rem]/[0.5rem] ~text-[0.75rem]/[0.875rem] font-medium leading-[120%] tracking-[-0.03em] transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-[#1A1A1A] bg-[#F8F5EE] hover:bg-[#F0E9DC]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="orders-filter-pill"
                    className="absolute inset-0 rounded-full bg-main"
                    transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders */}
      <div className="~pt-[1rem]/[1.5rem]">
        {filteredOrders.length > 0 ? (
          <motion.div layout className="flex flex-col ~gap-[0.75rem]/[1.25rem]">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <Image
              src={emptyBag}
              alt=""
              className="~size-[7rem]/[10rem] object-contain"
            />
            <p className="~text-[1rem]/[1.5rem] ~pt-[1rem]/[1.5rem] font-medium leading-[120%] tracking-[-0.03em] text-[#181D27]">
              No orders here yet
            </p>
            <p className="~pt-[0.25rem]/[0.5rem] ~text-[0.75rem]/[1rem] text-[#1A1A1ABF] tracking-[-0.02em]">
              {orders.length === 0
                ? "Once you place an order it will show up here."
                : "You don’t have any orders with this status."}
            </p>
            <Link
              prefetch={false}
              href="/shop"
              className="~mt-[1rem]/[1.5rem] relative overflow-hidden rounded-full bg-main text-white p-[0.125rem] ~w-[6.5625rem]/[9rem] flex items-center justify-end ~text-[0.75rem]/[1rem] tracking-[-0.03em] leading-[120%] font-medium group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
              <span className="absolute z-10 ~left-[0.5rem]/[1rem]">
                Shop now
              </span>
              <div className="relative z-10 ~w-[2rem]/[2.5rem] ~h-[2rem]/[2.5rem] flex justify-center items-center bg-white rounded-full transition-all duration-700 ease-in-out">
                <Arrow className="~size-[1rem]/[1.5rem] text-main absolute right-[0.5rem] transition-transform duration-700 ease-in-out group-hover:-rotate-45" />
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Load more */}
      {hasNextPage && activeFilter === "all" && (
        <div className="flex justify-center ~pt-[1.5rem]/[2rem]">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="~text-[0.6875rem]/[0.875rem] group overflow-hidden relative flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] border border-main font-medium text-main ~px-[1.5rem]/[2rem] ~py-[0.5rem]/[0.625rem] transition-all duration-700 ease-in-out hover:border-transparent hover:text-white disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-10">
              {isFetchingNextPage ? "Loading…" : "Load more orders"}
            </span>
          </button>
        </div>
      )}

      {/* Help strip */}
      <div className="~mt-[1.5rem]/[2.5rem] border border-[#00000014] ~rounded-[0.74875rem]/[1rem] ~px-[1rem]/[1.5rem] ~py-[1rem]/[1.25rem] flex flex-wrap items-center justify-between ~gap-[0.75rem]/[1rem]">
        <div>
          <p className="~text-[0.875rem]/[1rem] font-semibold leading-[120%] tracking-[-0.03em]">
            Need help with an order?
          </p>
          <p className="~pt-[0.25rem]/[0.375rem] ~text-[0.6875rem]/[0.875rem] text-[#1A1A1ABF] leading-[130%] tracking-[-0.02em]">
            Our team is available Monday to Saturday, 10 AM to 7 PM.
          </p>
        </div>
        <Link
          prefetch={false}
          href="/contact-us"
          className="~text-[0.6875rem]/[0.875rem] group overflow-hidden relative max-sm:w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] border border-main font-medium text-main ~px-[1rem]/[1.5rem] ~py-[0.5rem]/[0.625rem] transition-all duration-700 ease-in-out hover:border-transparent hover:text-white"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
          <span className="relative z-10">Contact Support</span>
        </Link>
      </div>
    </div>
  );
};

export default OrdersList;

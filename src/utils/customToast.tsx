import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type TToastPosition =
  | "bottom-right"
  | "top-right"
  | "top-left"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export type ToastItem = {
  id: number;
  name: string;
  image: string;
};

export type PromoInfo = {
  freeWeight: number;
  currentWeight: number;
  isQualified: boolean;
};

type ShowCustomToastParams = {
  item: ToastItem;
  message: string;
  quantity?: number;
  duration?: number;
  position?: TToastPosition;
  openCart: () => void;
  type?: "favorite" | "cart" | "general";
  promo?: PromoInfo;
};

export const showCustomItemToast = ({
  item,
  message,
  quantity,
  duration = 3500,
  position = "bottom-right",
  type = "general",
  openCart,
  promo,
}: ShowCustomToastParams) => {
  toast.custom(
    (t) => (
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={
          " rounded-[1rem] z-[5000]  p-[1.25rem]  ~min-w-[18.75rem]/[22.5rem] lg:~max-w-[22.5rem]/[26.25rem] relative border border-[#00000033] bg-[#FFFFFF] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]  max-lg:~mb-[1rem]/[3.5rem] max-lg:w-full"
        }
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        key={t.id}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="relative flex  gap-[0.5rem] items-center overflow-hidden  w-full">
          <div className=" ~size-[4rem]/[4.125rem] bg-[#FFF5E7] rounded-[0.25rem]  relative  shrink-0 ">
            <Image
              alt={item.name || "Item Image"}
              className="object-contain"
              fill
              src={item.image}
            />
          </div>

          <div className="w-full">
            <div className=" ~gap-3.5/5 flex w-full grow-1 items-start">
              <div className=" min-w-0 flex-1 grow-1">
                <p className="~text-[0.7rem]/[0.75rem] font-light tracking-[0.01em] text-[#000000C7]">
                  {message}
                </p>
                <p className="~text-[0.875rem]/[1rem] truncate font-neueHaasMedium text-black tracking-tight">
                  {item.name}
                </p>
                {quantity !== undefined && (
                  <div className="~pt-[0.5rem]/[1rem] flex items-center gap-2">
                    <span className="~text-[0.7rem]/[0.75rem] font-light tracking-[0.01em] text-[#000000C7]">
                      Quantity:
                    </span>
                    <span className=" ~text-[0.7rem]/[0.75rem] font-light tracking-[0.01em] text-[#000000C7] tabular-nums">
                      {quantity}
                    </span>
                  </div>
                )}
              </div>

              <button
                aria-label="Dismiss"
                className="size-[1.5rem] bg-[#9A29231A] ~top-[0.5rem]/[0.75rem] ~right-[0.5rem]/[0.75rem] absolute flex shrink-0 items-center justify-center overflow-hidden rounded-full text-main transition-all duration-150 hover:bg-gray-100/60 hover:text-gray-600 active:scale-90"
                onClick={() => {
                  console.log("Dismissing toast with ID:", t.id);
                  toast.dismiss(t.id);
                }}
                type="button"
              >
                <svg
                  className="~size-3.5/4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <title>Close notification</title>
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {type === "cart" && (
                <button
                  className={`~text-[0.7rem]/[0.75rem] font-light ${promo?.isQualified ? "bottom-[2rem]" : "bottom-[0rem]"} tracking-[0.01em] absolute right-[1rem]   text-main underline underline-offset-2 hover:opacity-50`}
                  onClick={() => {
                    toast.dismiss(t.id);
                    openCart();
                  }}
                >
                  View Cart
                </button>
              )}
            </div>
            {promo?.isQualified && (
              <div className="~mt-[0.5rem]/[1rem] flex justify-center items-center gap-2 px-2 py-1 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white rounded-[0.375rem] w-full">
                <span className="~text-[0.7rem]/[0.75rem] font-medium text-center  tabular-nums">
                  {promo.freeWeight} kg Free!
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    ),
    {
      duration,
      position,
      id: `custom-toast-${type}-${item.id}`,
    },
  );
};

// Create a new file: components/FreeItemToast.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ToastItem } from "./customToast";

type TToastPosition =
  | "bottom-right"
  | "top-right"
  | "top-left"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface FreeItemToastParams {
  item: ToastItem;
  freeQuantity: number;
  originalQuantity: number;
  duration?: number;
  position?: TToastPosition;
  openCart: () => void;
}

export const showFreeItemToast = ({
  item,
  freeQuantity,
  originalQuantity,
  duration = 4000,
  position = "top-right",
  openCart,
}: FreeItemToastParams) => {
  toast.custom(
    (t) => (
      <motion.div
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: [0, -2, 2, -2, 2, 0], // Gentle wobble
        }}
        className={
          "rounded-[1rem] z-[5000] p-[1.25rem] ~min-w-[18.75rem]/[22.5rem] lg:~max-w-[22.5rem]/[26.25rem] relative gap-[0.5rem] flex items-center overflow-hidden border-2 border-[#4CAF50] bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] shadow-[0_8px_32px_rgba(76,175,80,0.15),0_4px_12px_rgba(76,175,80,0.1)]"
        }
        exit={{
          opacity: 0,
          scale: 0.9,
          y: -20,
          rotate: 5,
        }}
        initial={{
          opacity: 0,
          scale: 0.7,
          y: -30,
          rotate: -10,
        }}
        key={t.id}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          rotate: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }}
      >
        {/* Free Badge */}
        <div className="absolute -top-3 -right-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="bg-[#4CAF50] text-white ~text-[0.75rem]/[0.875rem] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
          >
            FREE
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.div>
        </div>

        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              initial={{
                opacity: 0,
                y: -10,
                x: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -40],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: 0,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {["🎉", "✨", "🎁", "🌟", "💫"][i % 5]}
            </motion.div>
          ))}
        </div>

        <div className="~size-[4rem]/[4.125rem] bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7] rounded-[0.5rem] relative shrink-0 border-2 border-[#4CAF50]/30 overflow-hidden">
          <Image
            alt={item.name || "Free Item Image"}
            className="object-contain p-1"
            fill
            src={item.image}
          />

          {/* Glow effect around image */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-[0.5rem] border-2 border-[#4CAF50]/20"
          />
        </div>

        <div className="~gap-3.5/5 flex w-full grow-1 items-start">
          <div className="min-w-0 flex-1 grow-1">
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="~text-[0.7rem]/[0.75rem] font-light tracking-[0.01em] text-[#2E7D32]"
            >
              🎉 You earned a FREE gift!
            </motion.p>

            <motion.p
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="~text-[0.875rem]/[1rem] truncate font-neueHaasMedium text-[#1B5E20] tracking-tight"
            >
              {item.name}
            </motion.p>

            <div className="~pt-[0.5rem]/[1rem] flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="~text-[0.7rem]/[0.75rem] font-light tracking-[0.01em] text-[#388E3C]">
                  You bought:
                </span>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                  className="~text-[0.7rem]/[0.75rem] font-medium text-[#1B5E20] tabular-nums"
                >
                  {originalQuantity}kg
                </motion.span>
              </div>

              <div className="flex items-center gap-2">
                <span className="~text-[0.7rem]/[0.75rem] font-light tracking-[0.01em] text-[#4CAF50]">
                  You get FREE:
                </span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 1 }}
                  className="~text-[0.75rem]/[0.875rem] font-bold text-[#2E7D32] tabular-nums"
                >
                  +{freeQuantity}kg
                </motion.span>
              </div>
            </div>
          </div>

          <button
            aria-label="Dismiss"
            className="size-[1.5rem] bg-[#4CAF50]/10 ~top-[0.5rem]/[0.75rem] ~right-[0.5rem]/[0.75rem] absolute flex shrink-0 items-center justify-center overflow-hidden rounded-full text-[#2E7D32] transition-all duration-150 hover:bg-[#4CAF50]/20 hover:text-[#1B5E20] active:scale-90"
            onClick={() => toast.dismiss(t.id)}
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

          <button
            className="~text-[0.7rem]/[0.75rem] font-medium tracking-[0.01em] absolute right-[1rem] bottom-[1rem] text-[#2E7D32] underline underline-offset-2 hover:text-[#4CAF50]"
            onClick={() => {
              toast.dismiss(t.id);
              openCart();
            }}
          >
            View in Cart →
          </button>
        </div>
      </motion.div>
    ),
    {
      duration,
      position,
      id: `free-toast-${item.id}-${Date.now()}`,
    },
  );
};

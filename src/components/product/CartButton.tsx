"use client";

import { TProduct } from "@/src/api/type";
import { useMenuCart } from "@/src/hooks/useMenuCart";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import CartBucket from "../svg/CartBucket";
import Decrease from "../svg/Decrease";
import Increase from "../svg/Increase";

type CustomIngredient = {
  id: number;
  name: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
};

const CartButton = ({
  section,
  item,
  selectedVariant,
  customIngredients,
  selectedSpiceLevel,
  grinding,
  finalPrice,
}: {
  section: string;
  item: TProduct;
  selectedVariant?: any;
  customIngredients?: CustomIngredient[];
  selectedSpiceLevel?: any;
  grinding?: string;
  finalPrice?: number;
}) => {
  const { items, updateCart } = useMenuCart();
  const [showControls, setShowControls] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a unique key for this specific configuration
  const generateCartItemKey = () => {
    const variantKey = selectedVariant?.id
      ? `-variant-${selectedVariant.id}`
      : "";
    const spiceKey = selectedSpiceLevel?.id
      ? `-spice-${selectedSpiceLevel.id}`
      : selectedSpiceLevel
        ? `-spice-${selectedSpiceLevel}`
        : "";
    const grindKey = grinding ? `-grind-${grinding}` : "";
    const ingredientsKey = customIngredients?.length
      ? `-ing-${customIngredients.map((i) => `${i.id}-${i.qty}`).join("_")}`
      : "";

    return `${item.id}${variantKey}${spiceKey}${grindKey}${ingredientsKey}`;
  };

  const cartItemKey = generateCartItemKey();

  // Find the exact matching cart item using the unique key
  const cartItem = items.find((cartSingleItem) => {
    // First try to match by cartItemKey if it exists
    if (cartSingleItem.cartItemKey) {
      return cartSingleItem.cartItemKey === cartItemKey;
    }

    return (
      cartSingleItem.id === item.id &&
      cartSingleItem.variantId === selectedVariant?.id &&
      cartSingleItem.variantName === selectedVariant?.name &&
      // Compare custom ingredients
      JSON.stringify(cartSingleItem.customIngredients || []) ===
        JSON.stringify(customIngredients || []) &&
      (cartSingleItem.spiceLevel?.id === selectedSpiceLevel?.id ||
        cartSingleItem.spiceLevel === selectedSpiceLevel) &&
      // Compare grinding
      cartSingleItem.grinding === grinding
    );
  });

  const itemQuantity = cartItem?.quantity ?? 0;
  const directionRef = useRef<"increase" | "decrease">("increase");

  const maxQuantity = item.max_quantity || 15;
  const isMaxReached = itemQuantity >= maxQuantity;

  // Reset button view timer
  const resetButtonTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (itemQuantity > 0) {
      setShowControls(true);
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    }
  };

  useEffect(() => {
    resetButtonTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [itemQuantity]);

  const handleIncrease = () => {
    if (isMaxReached) {
      return;
    }
    directionRef.current = "increase";
    updateCart(
      item,
      section,
      "increase",
      selectedVariant,
      customIngredients,
      selectedSpiceLevel,
      grinding,
      finalPrice,
    );
  };

  const handleDecrease = () => {
    directionRef.current = "decrease";
    updateCart(
      item,
      section,
      "decrease",
      selectedVariant,
      customIngredients,
      selectedSpiceLevel,
      grinding,
      finalPrice,
    );
  };

  if (!selectedVariant && item.product_type === 1) {
    return (
      <button
        className="w-full ~text-[0.75rem]/[1rem] rounded-full bg-gray-300 font-medium text-white py-[0.78125rem] cursor-not-allowed"
        disabled
      >
        Select Variant
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00]">
      <AnimatePresence initial={false} mode="wait">
        {cartItem && showControls ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00] ~h-[2.5rem]/[2.8125rem]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={"in-cart"}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <button
              className="flex cursor-pointer items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDecrease}
              type="button"
            >
              <Decrease />
            </button>
            <AnimatePresence mode="wait">
              <motion.p
                animate={{ opacity: 1, x: 0 }}
                className="text-[1rem] min-w-[8ch] text-center select-none font-medium text-white"
                exit={{
                  opacity: 0,
                  x: directionRef.current === "increase" ? -20 : 20,
                }}
                initial={{
                  opacity: 0,
                  x: directionRef.current === "increase" ? 20 : -20,
                }}
                key={itemQuantity}
                transition={{ duration: 0.15, ease: "easeInOut" }}
              >
                {itemQuantity}
              </motion.p>
            </AnimatePresence>
            <button
              className="flex ~text-[1rem]/[1.5rem] cursor-pointer items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleIncrease}
              disabled={isMaxReached}
              type="button"
            >
              <Increase />
            </button>
          </motion.div>
        ) : (
          <motion.button
            animate={{ opacity: 1, x: 0 }}
            className="~text-[0.75rem]/[1rem] relative group w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white ~py-[0.75rem]/[0.78125rem]"
            exit={{ opacity: 0, x: -10 }}
            initial={{ opacity: 0, x: -10 }}
            key={"add-to-cart"}
            onClick={handleIncrease}
            disabled={maxQuantity <= 0}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            type="button"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <CartBucket className="~size-[1rem]/[1.25rem] z-40" />
            <span className="z-40">
              {maxQuantity <= 0 ? "Out of Stock" : "Add to Cart"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;

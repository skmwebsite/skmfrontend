"use client";

import { TProduct } from "@/src/api/type";
import { useMenuCart } from "@/src/hooks/useMenuCart";
import { AnimatePresence, calcLength, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import CartBucket from "../svg/CartBucket";
import Decrease from "../svg/Decrease";
import Increase from "../svg/Increase";

// Helper function to convert weight to kg
const convertToKg = (quantity: number, unit: string): number => {
  const unitLower = unit?.toLowerCase() || "";
  if (unitLower === "kg") return quantity;
  if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
  if (unitLower === "mg") return quantity / 1000000;
  return quantity;
};

const calculateTotalWeightInKg = (
  quantity: number,
  variantName?: string,
  variantUnit?: string,
): number => {
  if (!variantName || !variantUnit) return 0;
  const weightPerUnit = parseFloat(variantName) || 0;
  if (weightPerUnit === 0) return 0;
  return convertToKg(weightPerUnit * quantity, variantUnit);
};

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
  customIngredients?: CustomIngredient[] | null;
  selectedSpiceLevel?: any;
  grinding?: string | null;
  finalPrice?: number | null;
}) => {
  const { items, updateCart } = useMenuCart();
  const [showControls, setShowControls] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a unique key for this specific configuration
  // Only use item.id and variantId for basic matching
  // Custom ingredients require exact match
  const generateMatchingKey = () => {
    const variantKey = selectedVariant?.id
      ? `-variant-${selectedVariant.id}`
      : "";

    // Only include custom ingredients if they exist (for customized products)
    const ingredientsKey = customIngredients?.length
      ? `-ing-${customIngredients
          .sort((a, b) => a.id - b.id)
          .map((i) => `${i.id}-${i.qty}`)
          .join("_")}`
      : "";

    return `${item.id}${variantKey}${ingredientsKey}`;
  };

  const matchingKey = generateMatchingKey();

  // Find the exact matching cart item using the matching key
  const cartItem = items.find((cartSingleItem) => {
    // Generate matching key for the cart item
    const cartItemMatchingKey = (() => {
      const variantKey = cartSingleItem.variantId
        ? `-variant-${cartSingleItem.variantId}`
        : "";

      // Only include custom ingredients if they exist
      const ingredientsKey = cartSingleItem.customIngredients?.length
        ? `-ing-${cartSingleItem.customIngredients
            .sort((a: any, b: any) => a.id - b.id)
            .map((i: any) => `${i.id}-${i.qty}`)
            .join("_")}`
        : "";

      return `${cartSingleItem.id}${variantKey}${ingredientsKey}`;
    })();

    return cartItemMatchingKey === matchingKey;
  });

  const itemQuantity = cartItem?.quantity ?? 0;
  const directionRef = useRef<"increase" | "decrease">("increase");

  const variantName = cartItem?.variantName || selectedVariant?.name;
  const variantUnit = cartItem?.variantUnit || selectedVariant?.unit;

  const weightPerPieceInKg = calculateTotalWeightInKg(
    1,
    variantName,
    variantUnit,
  );
  const currentTotalWeightInKg = weightPerPieceInKg * itemQuantity;
  console.log("currentTotalWeightInKg", currentTotalWeightInKg);
  console.log("weightPerPieceInKg", weightPerPieceInKg);
  const maxWeightKg = item.max_quantity || 15;

  const isMaxReached =
    weightPerPieceInKg > 0 &&
    currentTotalWeightInKg + weightPerPieceInKg > maxWeightKg;

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
            disabled={maxWeightKg <= 0 || isMaxReached}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            type="button"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <CartBucket className="~size-[1rem]/[1.25rem] z-40" />
            <span className="z-40">
              {maxWeightKg <= 0 || isMaxReached
                ? "Out of Stock"
                : "Add to Cart"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;

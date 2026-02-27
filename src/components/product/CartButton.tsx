"use client";

import { TProduct } from "@/src/api/type";
import { useMenuCart } from "@/src/hooks/useMenuCart";
import { convertToKg, isMaxWeightReached } from "@/src/hooks/useCart";
import { AnimatePresence, calcLength, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import CartBucket from "../svg/CartBucket";
import Decrease from "../svg/Decrease";
import Increase from "../svg/Increase";

// Helper function to parse weight and unit from variant name (for type 2 products)
// e.g., "500 gm" -> { weight: 500, unit: "gm" }
// e.g., "1 kg" -> { weight: 1, unit: "kg" }
const parseWeightFromName = (
  name: string,
): { weight: number; unit: string } | null => {
  if (!name) return null;

  // Match patterns like "500 gm", "1 kg", "500gm", "1kg", "500 g", "1.5 kg"
  const match = name.match(
    /(\d+(?:\.\d+)?)\s*(kg|gm|g|gram|grams|kilogram|kilograms)/i,
  );
  if (match) {
    const weight = parseFloat(match[1]);
    let unit = match[2].toLowerCase();
    // Normalize unit
    if (unit === "g" || unit === "gram" || unit === "grams") unit = "gm";
    if (unit === "kilogram" || unit === "kilograms") unit = "kg";
    return { weight, unit };
  }
  return null;
};

// Helper function to parse pcs (pieces) from variant name (for type 2 products)
// e.g., "10 pcs" -> { quantity: 10, unit: "pcs" }
// e.g., "5pcs" -> { quantity: 5, unit: "pcs" }
const parsePcsFromName = (
  name: string,
): { quantity: number; unit: string } | null => {
  if (!name) return null;

  // Match patterns like "10 pcs", "5pcs", "10 pieces", "5 piece"
  const match = name.match(/(\d+)\s*(pcs|pc|pieces|piece)/i);
  if (match) {
    const quantity = parseInt(match[1], 10);
    return { quantity, unit: "pcs" };
  }
  return null;
};

const calculateTotalWeightInKg = (
  quantity: number,
  variantName?: string,
  variantUnit?: string,
  productType?: number,
): number => {
  if (!variantName) return 0;

  // For type 2 products, parse weight and unit from name
  if (productType === 2) {
    const parsed = parseWeightFromName(variantName);
    if (parsed) {
      const result = convertToKg(parsed.weight * quantity, parsed.unit);
      return Math.round(result * 1e10) / 1e10;
    }
    return 0;
  }

  // For type 1 products, use separate name and unit
  if (!variantUnit) return 0;
  const weightPerUnit = parseFloat(variantName) || 0;
  if (weightPerUnit === 0) return 0;
  const result = convertToKg(weightPerUnit * quantity, variantUnit);
  return Math.round(result * 1e10) / 1e10;
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
  const [showControls] = useState(true);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateMatchingKey = () => {
    const variantKey = selectedVariant?.id
      ? `-variant-${selectedVariant.id}`
      : "";

    // For type 2 products without customization, include default variant ingredients
    let ingredientsToUse = customIngredients;
    if (
      item.product_type === 2 &&
      (!customIngredients || customIngredients.length === 0) &&
      selectedVariant?.ingredients
    ) {
      ingredientsToUse = selectedVariant.ingredients.map((ingredient: any) => ({
        id: ingredient.id,
        qty: parseFloat(ingredient.quantity) || 0,
      }));
    }

    const ingredientsKey = ingredientsToUse?.length
      ? `-ing-${ingredientsToUse
          .sort((a, b) => a.id - b.id)
          .map((i) => `${i.id}-${i.qty}`)
          .join("_")}`
      : "";

    return `${item.id}${variantKey}${ingredientsKey}`;
  };

  const matchingKey = generateMatchingKey();

  const cartItem = items.find((cartSingleItem) => {
    const cartItemMatchingKey = (() => {
      const variantKey = cartSingleItem.variantId
        ? `-variant-${cartSingleItem.variantId}`
        : "";

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

  const variantName = String(
    cartItem?.variantName || selectedVariant?.name || "",
  );
  const variantUnit = cartItem?.variantUnit || selectedVariant?.unit || "";

  const parsedPcs =
    item.product_type === 2 ? parsePcsFromName(variantName) : null;

  // Check if this is a "pcs" (pieces) product
  // For type 1: check variantUnit, for type 2: also check if name contains "pcs"
  const isPcsProduct =
    variantUnit.toLowerCase() === "pcs" || parsedPcs !== null;

  const weightPerPieceInKg = calculateTotalWeightInKg(
    1,
    variantName,
    variantUnit,
    item.product_type,
  );
  const currentTotalWeightInKg = weightPerPieceInKg * itemQuantity;

  const maxWeightKg = item.max_quantity || 15;

  // For pcs products, use product's max_quantity as the limit (not variant's max_quantity which is the pcs per unit)
  const maxPcsQuantity = item.max_quantity || 15;

  // For type 2, we don't need variantUnit check since unit is parsed from name
  // For pcs products, check against maxPcsQuantity instead of weight
  const isMaxReached = isPcsProduct
    ? itemQuantity >= maxPcsQuantity
    : variantName &&
      (item.product_type === 2 || variantUnit) &&
      weightPerPieceInKg > 0 &&
      currentTotalWeightInKg + weightPerPieceInKg > maxWeightKg;

  // const resetButtonTimer = () => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }

  //   if (itemQuantity > 0) {
  //     setShowControls(true);
  //     timeoutRef.current = setTimeout(() => {
  //       setShowControls(false);
  //     }, 5000);
  //   }
  // };

  // useEffect(() => {
  //   resetButtonTimer();

  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, [itemQuantity]);

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
                className="text-[1rem] min-w-[8ch] text-center select-none font-medium text-white flex items-center justify-center"
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
                style={{ display: "flex" }}
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
            disabled={
              isPcsProduct ? isMaxReached : maxWeightKg <= 0 || isMaxReached
            }
            transition={{ duration: 0.15, ease: "easeInOut" }}
            type="button"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <CartBucket className="~size-[1rem]/[1.25rem] z-40" />
            <span className="z-40">
              {isPcsProduct
                ? isMaxReached
                  ? "Max Quantity Reached"
                  : "Add to Cart"
                : maxWeightKg <= 0 || isMaxReached
                  ? "Max Weight Reached"
                  : "Add to Cart"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;

"use client";

import { TProduct } from "../api/type";
import { showCustomItemToast, ToastItem } from "../utils/customToast";
import { useCart } from "./useCart";

type CustomIngredient = {
  id: number;
  name: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
  rawMaterials?: any[];
  price?: number;
};

const generateCartItemKey = (
  item: TProduct,
  selectedVariant?: any,
  customIngredients?: CustomIngredient[],
  selectedSpiceLevel?: any,
  grinding?: string,
  price?: number,
): string => {
  const variantKey = selectedVariant?.id
    ? `-variant-${selectedVariant.id}`
    : "";
  const spiceKey = selectedSpiceLevel
    ? `-spice-${selectedSpiceLevel.id || selectedSpiceLevel}`
    : "";
  const grindKey = grinding ? `-grind-${grinding}` : "";
  const ingredientsKey = customIngredients?.length
    ? `-ing-${customIngredients.map((i) => `${i.id}-${i.qty}`).join("_")}`
    : "";
  const priceKey = price !== undefined ? `-price-${price.toFixed(2)}` : "";

  return `${item.id}${variantKey}${spiceKey}${grindKey}${ingredientsKey}${priceKey}`;
};

// Remove the calculateTotalPrice function - let Hero component handle it

export const useMenuCart = () => {
  const { updateItem, items, openCart } = useCart();

  const updateCart = (
    item: TProduct,
    section: string,
    action: "increase" | "decrease" = "increase",
    selectedVariant?: any,
    customIngredients?: CustomIngredient[],
    selectedSpiceLevel?: any,
    grinding?: string,
    // Add new parameters for price
    price?: number, // Final price calculated in Hero component
    priceDetails?: {
      // Optional: Price breakdown
      basePrice?: number;
      spiceLevelPrice?: number;
      grindingPrice?: number;
      isCustomized?: boolean;
      customIngredientsTotal?: number;
    },
  ) => {
    // Generate cart item key with price included
    const cartItemKey = generateCartItemKey(
      item,
      selectedVariant,
      customIngredients,
      selectedSpiceLevel,
      grinding,
      price, // Include price in the key
    );

    const existingItem = items.find(
      (cartItem) => cartItem.cartItemKey === cartItemKey,
    );

    const maxQuantity = item.max_quantity || 15;

    if (action === "increase") {
      if (existingItem && existingItem.quantity >= maxQuantity) {
        return;
      }

      if (!existingItem && maxQuantity <= 0) {
        return;
      }
    }

    const quantityChange = action === "increase" ? 1 : -1;

    // Use the price passed from Hero component, or calculate fallback
    const totalPrice =
      price !== undefined
        ? price
        : calculateFallbackPrice(
            // Keep fallback for backward compatibility
            item,
            selectedVariant,
            customIngredients,
            selectedSpiceLevel,
            grinding,
          );

    const cartItem = {
      id: item.id,
      tax: "0",
      cartItemKey: cartItemKey,
      image: item.thumbnail_image,
      title: item.name,
      category_name: section,
      category_has_offer: item.has_offer === 1 ? 1 : 0,
      description: item.description,
      price: totalPrice,
      productType: String(item.product_type),
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      variantUnit: selectedVariant?.unit,
      customIngredients: customIngredients,
      spiceLevel: selectedSpiceLevel
        ? {
            id: selectedSpiceLevel.id,
            level: selectedSpiceLevel.level,
            price: priceDetails?.spiceLevelPrice || selectedSpiceLevel.price,
          }
        : undefined,
      grinding: grinding,

      max_quantity: item.max_quantity || 15,
      quantity: (existingItem?.quantity || 0) + quantityChange,
    };

    updateItem(cartItem, quantityChange);

    const toastItem: ToastItem = {
      id: item.id,
      name: item.name,
      image: item.thumbnail_image,
    };

    let message = "";
    if (!existingItem && action === "increase") {
      message = "Added to Cart";
    } else if (existingItem && action === "increase") {
      message = "Quantity Updated";
    } else {
      message = "Removed from Cart";
    }

    showCustomItemToast({
      item: toastItem,
      message,
      quantity: (existingItem?.quantity || 0) + quantityChange,
      type: "cart",
      openCart: openCart,
    });
  };

  // Fallback calculation (for backward compatibility)
  const calculateFallbackPrice = (
    item: TProduct,
    selectedVariant?: any,
    customIngredients?: CustomIngredient[],
    selectedSpiceLevel?: any,
    grinding?: string,
  ): number => {
    let totalPrice = selectedVariant?.price || item.price || 0;

    if (customIngredients && customIngredients.length > 0) {
      const customIngredientsPrice = customIngredients.reduce((total, ing) => {
        return total + ing.qty * ing.pricePerUnit;
      }, 0);
      totalPrice = customIngredientsPrice;
    }

    if (selectedSpiceLevel && selectedSpiceLevel.price > 0) {
      totalPrice += selectedSpiceLevel.price;
    }

    if (grinding === "Yes" && selectedVariant?.has_grind === 1) {
      const variantName = selectedVariant?.name || "0";
      const unit = selectedVariant?.unit?.toLowerCase() || "gm";
      const variantKg = convertToKg(parseFloat(variantName), unit);

      if (selectedVariant.grind_price) {
        totalPrice += selectedVariant.grind_price * variantKg;
      }
    }

    return totalPrice;
  };

  const convertToKg = (quantity: number, unit: string): number => {
    const unitLower = unit?.toLowerCase() || "";
    if (unitLower === "kg") return quantity;
    if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
    return quantity;
  };

  return {
    items,
    updateCart,
  };
};

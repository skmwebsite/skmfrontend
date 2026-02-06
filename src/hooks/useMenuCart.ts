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

// Helper function: generates key for matching cart items
// Only uses item.id, variantId, and customIngredients for matching
const generateMatchingKey = (
  item: TProduct,
  selectedVariant?: any,
  customIngredients?: CustomIngredient[] | null,
  selectedSpiceLevel?: any,
  grinding?: string | null,
): string => {
  const variantKey = selectedVariant?.id
    ? `-variant-${selectedVariant.id}`
    : "";

  // Only include custom ingredients if they exist
  const ingredientsKey = customIngredients?.length
    ? `-ing-${customIngredients
        .sort((a, b) => a.id - b.id)
        .map((i) => `${i.id}-${i.qty}`)
        .join("_")}`
    : "";

  return `${item.id}${variantKey}${ingredientsKey}`;
};

// Original function: generates key WITHOUT price - price can vary based on spice level/grinding
const generateCartItemKey = (
  item: TProduct,
  selectedVariant?: any,
  customIngredients?: CustomIngredient[] | null,
  selectedSpiceLevel?: any,
  grinding?: string | null,
  price?: number,
): string => {
  // Use matching key - don't include price in the cartItemKey
  // Same product with different spice levels should be the same cart item
  const baseKey = generateMatchingKey(
    item,
    selectedVariant,
    customIngredients,
    selectedSpiceLevel,
    grinding,
  );
  const priceKey = price !== undefined ? `-price-${price.toFixed(2)}` : "";
  return `${baseKey}${priceKey}`;
};

export const useMenuCart = () => {
  const { updateItem, items, openCart } = useCart();

  const updateCart = (
    item: TProduct,
    section: string,
    action: "increase" | "decrease" = "increase",
    selectedVariant?: any,
    customIngredients?: CustomIngredient[] | null,
    selectedSpiceLevel?: any,
    grinding?: string | null,
    // Add new parameters for price
    price?: number | null, // Final price calculated in Hero component
    priceDetails?: {
      // Optional: Price breakdown
      basePrice?: number;
      spiceLevelPrice?: number;
      grindingPrice?: number;
      isCustomized?: boolean;
      customIngredientsTotal?: number;
    },
  ) => {
    // Generate matching key WITHOUT price for finding existing items
    const matchingKey = generateMatchingKey(
      item,
      selectedVariant,
      customIngredients,
    );

    // Find existing item using the matching key (without price)
    const existingItem = items.find((cartItem) => {
      // Generate matching key for the cart item
      const variantKey = cartItem.variantId
        ? `-variant-${cartItem.variantId}`
        : "";

      const ingredientsKey = cartItem.customIngredients?.length
        ? `-ing-${cartItem.customIngredients
            .sort((a: any, b: any) => a.id - b.id)
            .map((i: any) => `${i.id}-${i.qty}`)
            .join("_")}`
        : "";

      const cartItemMatchingKey = `${cartItem.id}${variantKey}${ingredientsKey}`;
      return cartItemMatchingKey === matchingKey;
    });

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

    // Use the price passed from component, or calculate fallback
    let totalPrice =
      price !== undefined && price !== null
        ? price
        : calculateFallbackPrice(
            item,
            selectedVariant,
            customIngredients,
            selectedSpiceLevel,
            grinding,
          );

    // Ensure totalPrice is never null
    if (totalPrice === null) {
      totalPrice = selectedVariant?.price || item.price || 0;
    }

    // Generate full cart item key WITH price for storage
    const cartItemKey = generateCartItemKey(
      item,
      selectedVariant,
      customIngredients,
      selectedSpiceLevel,
      grinding,
      totalPrice,
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

  const calculateFallbackPrice = (
    item: TProduct,
    selectedVariant?: any,
    customIngredients?: CustomIngredient[] | null,
    selectedSpiceLevel?: any,
    grinding?: string | null,
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

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
};

const convertToKg = (quantity: number, unit: string): number => {
  const unitLower = unit?.toLowerCase() || "";
  if (unitLower === "kg") return quantity;
  if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
  return quantity;
};

const generateCartItemKey = (
  item: TProduct,
  selectedVariant?: any,
  customIngredients?: CustomIngredient[],
  selectedSpiceLevel?: any,
  grinding?: string
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

  return `${item.id}${variantKey}${spiceKey}${grindKey}${ingredientsKey}`;
};

const calculateTotalPrice = (
  item: TProduct,
  selectedVariant?: any,
  customIngredients?: CustomIngredient[],
  selectedSpiceLevel?: any,
  grinding?: string
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

export const useMenuCart = () => {
  const { updateItem, items, openCart } = useCart();

  const updateCart = (
    item: TProduct,
    section: string,
    action: "increase" | "decrease" = "increase",
    selectedVariant?: any,
    customIngredients?: CustomIngredient[],
    selectedSpiceLevel?: any,
    grinding?: string
  ) => {
    const cartItemKey = generateCartItemKey(
      item,
      selectedVariant,
      customIngredients,
      selectedSpiceLevel,
      grinding
    );

    const existingItem = items.find(
      (cartItem) => cartItem.cartItemKey === cartItemKey
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

    const totalPrice = calculateTotalPrice(
      item,
      selectedVariant,
      customIngredients,
      selectedSpiceLevel,
      grinding
    );

    const cartItem = {
      id: item.id,
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
            price: selectedSpiceLevel.price,
          }
        : undefined,
      grinding: grinding,
      grindPrice:
        grinding === "Yes" && selectedVariant?.has_grind === 1
          ? (selectedVariant.grind_price || 0) *
            convertToKg(
              parseFloat(selectedVariant?.name || "0"),
              selectedVariant?.unit || "gm"
            )
          : 0,
      tax: "0",
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

  return {
    items,
    updateCart,
  };
};

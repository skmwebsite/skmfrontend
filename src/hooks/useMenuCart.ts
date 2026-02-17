"use client";

import { TProduct } from "../api/type";
import {
  showCustomItemToast,
  ToastItem,
  PromoInfo,
} from "../utils/customToast";
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

// Helper function to convert weight to kg
const convertToKg = (quantity: number, unit: string): number => {
  const unitLower = unit?.toLowerCase() || "";
  if (unitLower === "kg") return quantity;
  if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
  if (unitLower === "mg") return quantity / 1000000;
  return quantity;
};

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

// Helper function to calculate total weight in kg
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
  // Round to 10 decimal places to handle floating point precision
  return Math.round(result * 1e10) / 1e10;
};

// Helper function to get promo info for type 1 products with offer
const getPromoInfo = (
  productType: number,
  hasOffer: number,
  totalWeightInKg: number,
): PromoInfo | undefined => {
  // Only show promo for product_type === 1 AND has_offer === 1
  if (productType !== 1 || hasOffer !== 1) return undefined;

  // Calculate free weight: 1kg free for every 5kg
  const freeWeight = Math.floor(totalWeightInKg / 5);

  // Only return promo if there's a free weight
  if (freeWeight === 0) return undefined;

  return {
    freeWeight,
    currentWeight: totalWeightInKg,
    isQualified: true,
  };
};

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

  const ingredientsKey = customIngredients?.length
    ? `-ing-${customIngredients
        .sort((a, b) => a.id - b.id)
        .map((i) => `${i.id}-${i.qty}`)
        .join("_")}`
    : "";

  return `${item.id}${variantKey}${ingredientsKey}`;
};

const generateCartItemKey = (
  item: TProduct,
  selectedVariant?: any,
  customIngredients?: CustomIngredient[] | null,
  selectedSpiceLevel?: any,
  grinding?: string | null,
  price?: number,
): string => {
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
      // Use variant info from existingItem if available, otherwise from selectedVariant
      const variantName = String(
        existingItem?.variantName || selectedVariant?.name || "",
      );
      const variantUnit =
        existingItem?.variantUnit || selectedVariant?.unit || "";

      // Calculate total weight in kg for weight-based limit checking
      const currentWeightInKg = calculateTotalWeightInKg(
        existingItem?.quantity || 0,
        variantName,
        variantUnit,
        item.product_type,
      );
      const weightPerPieceInKg = calculateTotalWeightInKg(
        1,
        variantName,
        variantUnit,
        item.product_type,
      );

      // For type 2, we don't need variantUnit check since unit is parsed from name
      if (
        variantName &&
        (item.product_type === 2 || variantUnit) &&
        weightPerPieceInKg > 0 &&
        currentWeightInKg + weightPerPieceInKg > maxQuantity
      ) {
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

    // For type 2 products without customization, use default ingredients from variant
    let ingredientsForCart = customIngredients;
    const wasActuallyCustomized =
      !!customIngredients && customIngredients.length > 0;

    if (
      item.product_type === 2 &&
      (!customIngredients || customIngredients.length === 0) &&
      selectedVariant?.ingredients
    ) {
      ingredientsForCart = selectedVariant.ingredients.map(
        (ingredient: any) => ({
          id: ingredient.id,
          name: ingredient.raw_material_name || ingredient.name,
          qty: parseFloat(ingredient.quantity) || 0,
          unit: ingredient.unit || "gm",
          pricePerUnit: 0,
          raw_material_id: ingredient.raw_material_id,
          rawMaterials: ingredient.raw_materials || [], // Include raw_materials for weight calculation
        }),
      );
    }

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
      variantName: String(selectedVariant?.name || ""),
      variantUnit: selectedVariant?.unit || "",
      customIngredients: ingredientsForCart,
      hasCustomizedIngredients: wasActuallyCustomized,
      spiceLevel: selectedSpiceLevel
        ? {
            id: selectedSpiceLevel.id,
            level: selectedSpiceLevel.level,
            price: priceDetails?.spiceLevelPrice || selectedSpiceLevel.price,
            quantity_in_gm: selectedSpiceLevel.quantity_in_gm || "0",
          }
        : undefined,
      grinding: grinding || undefined,
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

    // Calculate promo info for type 1 products with offer
    const newQuantity = (existingItem?.quantity || 0) + quantityChange;
    const totalWeightInKg = calculateTotalWeightInKg(
      newQuantity,
      selectedVariant?.name,
      selectedVariant?.unit,
      item.product_type,
    );
    const promo = getPromoInfo(
      item.product_type,
      item.has_offer || 0,
      totalWeightInKg,
    );

    showCustomItemToast({
      item: toastItem,
      message,
      quantity: newQuantity,
      type: "cart",
      openCart: openCart,
      promo,
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

  return {
    items,
    updateCart,
  };
};

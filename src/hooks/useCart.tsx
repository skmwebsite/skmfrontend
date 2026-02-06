import React, { createContext, useState } from "react";
import { deepClone, formatCurrency, hash } from "../lib/helpers";
import cartStorage from "../lib/storage";

const defaultCartId = "shree-kakaji-masale-cart";
const defaultCurrency = "INR";
const defaultLocale = "en-IN";
let cartIdentifier: string;
let cartCurrency: string;
let cartLocale: string;

export type Item = {
  id: number | string;
  price: number;
  quantity: number;
  image: string;
  title: string;
  itemTotal?: number;
  itemId?: string;
  productType: string;
  tax: string;
  original_price?: number;
  isFreeItem?: boolean;
  linkedItemId?: string;
  variantUnit?: string;
  variantName?: string | number;
  category_has_offer?: number;
  max_quantity?: number;
  customIngredients?: any;
  spiceLevel?: any;
  grinding?: string;
  grindPrice?: number;
  category_name?: string;
  cartItemKey?: string;
  [key: string]: unknown;
  yadi_variant?: {
    variant_id: number;
    ingredients: { raw_material_id: number; quantity: number }[];
  };
  spice_level?: number;
  has_grind?: boolean;
};

export type Discount = {
  id: string;
  code: string;
  type: DiscountTypes;
  value: number;
};

export type Shipping = {
  description: string;
  cost: number;
};

export type Metadata = {
  [key: string]: unknown;
};

export type Storage = {
  items: Item[];
  discount: Discount;
  metadata: Metadata;
};

export const initialState: Partial<CartProviderState> = {
  items: [] as Item[],
  discount: undefined,
  shipping: undefined,
  totalUniqueItems: 0,
  totalNumberItems: 0,
  totalDiscountAmount: 0,
  cartDiscountText: "",
  totalShippingAmount: 0,
  cartNetTotal: 0,
  totalItemsAmount: 0,
  cartTotal: 0,
  currency: "INR",
  locale: "en-IN",
  cartId: defaultCartId,
};

type DiscountTypes = "amount" | "percent";

export type CartProviderState = {
  // Totals
  totalItemsAmount: number;
  totalUniqueItems: number;
  cartNetTotal: number;
  cartTotal: number;
  totalNumberItems: number;

  updateItem: (item: Item, quantityChange: number) => void;
  removeItem: (item: Item) => void;
  getItem: (item: Item) => Item | undefined;
  items: Item[];

  addDiscount: (discount: Discount) => void;
  removeDiscount: () => void;
  discount: Discount | undefined;
  cartDiscountText: string;
  totalDiscountAmount: number;

  // Shipping
  addShipping: (shipping: Shipping) => void;
  removeShipping: () => void;
  shipping: Shipping | undefined;
  totalShippingAmount: number;

  // Metadata
  setMetadata: (metadata: Metadata) => void;
  clearMetadata: () => void;
  metadata: Metadata;

  // Cart
  emptyCart: () => void;
  currency: string;
  locale: string;
  cartId: string;

  // Modal
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export type Actions =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; itemId: Item["itemId"] }
  | { type: "UPDATE_ITEM"; itemId: Item["itemId"]; payload: Partial<Item> }
  | { type: "ADD_DISCOUNT"; payload: Discount }
  | { type: "REMOVE_DISCOUNT" }
  | { type: "ADD_SHIPPING"; payload: Shipping }
  | { type: "REMOVE_SHIPPING" }
  | { type: "EMPTY_CART" }
  | { type: "CLEAR_CART_META" }
  | { type: "SET_CART_META"; payload: Metadata };

// Create and export context
const CartContext = createContext<CartProviderState | undefined>(
  initialState as CartProviderState,
);

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("Expected to be wrapped in a CartProvider");
  }

  return context;
};

// Helper to convert quantity to kg
const convertToKg = (quantity: number, unit: string): number => {
  const unitLower = unit?.toLowerCase() || "";
  if (unitLower === "kg") return quantity;
  if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
  return quantity;
};

const calculateFreeKg = (totalKg: number): number => {
  if (totalKg < 6) return 0;

  if (totalKg <= 19) {
    if (totalKg >= 15) return 3;
    if (totalKg >= 10) return 2;
    if (totalKg >= 6) return 1;
  }

  const additionalKg = totalKg - 19;
  const additionalFreeKg = Math.floor(additionalKg / 5) + 1;

  return 3 + additionalFreeKg;
};
// Replace the current manageFreeItems function with this:

const manageFreeItems = (items: Item[]): Item[] => {
  // Remove ALL existing free items first
  const nonFreeItems = items.filter((item) => !item.isFreeItem);

  const updatedItems = [...nonFreeItems];

  // Calculate free items for EACH eligible product individually
  nonFreeItems.forEach((item) => {
    // Check if product is eligible for free offer
    if (item.category_has_offer !== 1) return;

    const unit = item.variantUnit || "gm";
    const variantName = item.variantName ? String(item.variantName) : "0";
    const itemKg = convertToKg(parseFloat(variantName), unit);
    const totalProductKg = itemKg * item.quantity;

    // Calculate free kg for this specific product
    // 5-9 kg → 1 kg free, 10-14 kg → 2 kg free, 15-19 kg → 3 kg free, etc.
    let freeKg = 0;

    if (totalProductKg >= 5 && totalProductKg < 10) {
      freeKg = 1;
    } else if (totalProductKg >= 10 && totalProductKg < 15) {
      freeKg = 2;
    } else if (totalProductKg >= 15 && totalProductKg < 20) {
      freeKg = 3;
    } else if (totalProductKg >= 20) {
      freeKg = 3 + Math.floor((totalProductKg - 19) / 5);
    }

    // Only add free item if freeKg is at least 1kg
    if (freeKg >= 1) {
      const freeItem: Item = {
        ...item,
        id: `${item.id}_free`,
        itemId: `${item.itemId}_free_${Date.now()}_${freeKg}`,
        cartItemKey: item.cartItemKey
          ? `${item.cartItemKey}_free_${freeKg}`
          : `${item.id}_free_${freeKg}`,
        quantity: 1,
        variantName: String(freeKg),
        variantUnit: "kg",
        price: 0,
        itemTotal: 0,
        isFreeItem: true,
        linkedItemId: String(item.id),
        title: ` FREE ${freeKg}kg ${item.title}`,
        image: item.image,
        tax: "0",
        productType: item.productType,
      };

      updatedItems.push(freeItem);
    }
  });

  return updatedItems;
};
const reducer = (state: CartProviderState, action: Actions) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const items = manageFreeItems([...state.items, action.payload]);
      return updateState(state, items);
    }

    case "UPDATE_ITEM": {
      const items = state.items.map((item: Item) => {
        if (item.itemId !== action.itemId) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        };
      });

      const updatedItems = manageFreeItems(items);
      return updateState(state, updatedItems);
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i: Item) => i.itemId !== action.itemId);
      const updatedItems = manageFreeItems(items);
      return updateState(state, updatedItems);
    }

    case "ADD_DISCOUNT": {
      const updatedState = {
        ...state,
        discount: {
          ...action.payload,
        },
      };

      // Recalculate free items when discount is added
      const updatedItems = manageFreeItems(state.items);
      return updateState(updatedState, updatedItems);
    }

    case "REMOVE_DISCOUNT": {
      // Recalculate free items when discount is removed
      const updatedItems = manageFreeItems(state.items);
      return updateState(
        {
          ...state,
          discount: undefined,
        },
        updatedItems,
      );
    }

    case "ADD_SHIPPING": {
      const updatedState = {
        ...state,
        shipping: {
          ...action.payload,
        },
      };

      // Recalculate free items when shipping is added
      const updatedItems = manageFreeItems(state.items);
      return updateState(updatedState, updatedItems);
    }

    case "REMOVE_SHIPPING": {
      // Recalculate free items when shipping is removed
      const updatedItems = manageFreeItems(state.items);
      return updateState(
        {
          ...state,
          shipping: undefined,
        },
        updatedItems,
      );
    }

    case "EMPTY_CART": {
      return initialState as CartProviderState;
    }

    case "CLEAR_CART_META": {
      // Recalculate free items when metadata is cleared
      const updatedItems = manageFreeItems(state.items);
      return updateState(
        {
          ...state,
          metadata: {},
        },
        updatedItems,
      );
    }

    case "SET_CART_META": {
      // Recalculate free items when metadata is set
      const updatedItems = manageFreeItems(state.items);
      return updateState(
        {
          ...state,
          metadata: {
            ...action.payload,
          },
        },
        updatedItems,
      );
    }
    default:
      return state;
  }
};

const updateState = (
  state: CartProviderState,
  items: Item[],
): CartProviderState => {
  // Filter out free items for unique items count
  const nonFreeItems = items.filter((item) => !item.isFreeItem);
  const totalUniqueItems = getTotalUniqueItems(nonFreeItems);

  return {
    ...initialState,
    ...state,
    items: getItemTotals(items),
    discount: state.discount,
    shipping: state.shipping,
    totalNumberItems: getTotalNumberItems(nonFreeItems),
    totalUniqueItems,
    totalDiscountAmount: calculateDiscount(nonFreeItems, state.discount),
    totalShippingAmount: calculateShipping(state.shipping),
    cartDiscountText: getDiscountText(state.discount),
    cartNetTotal: calculateNetTotal(nonFreeItems, state.discount),
    totalItemsAmount: getTotalItemsAmount(nonFreeItems),
    cartTotal: getCartTotal(nonFreeItems, state.discount, state.shipping),
  };
};

// Helper functions
const getTotalUniqueItems = (items: Item[]) => items.length;

const getItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.isFreeItem ? 0 : item.price * item.quantity,
  }));

const getTotalNumberItems = (items: Item[]) =>
  items.reduce(
    (sum: number, item: Item) => sum + (item.isFreeItem ? 0 : item.quantity),
    0,
  );

const getCartTotal = (
  items: Item[],
  discount: Discount | undefined,
  shipping: Shipping | undefined,
) => {
  let totalCartAmount = items.reduce((total, item) => {
    if (item.isFreeItem) return total;
    const itemPrice: number =
      typeof item.original_price === "number"
        ? item.original_price
        : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  if (discount?.code) {
    totalCartAmount -= calculateDiscount(items, discount);
  }

  if (shipping?.cost) {
    totalCartAmount += calculateShipping(shipping);
  }

  return totalCartAmount;
};

const calculateNetTotal = (items: Item[], discount: Discount | undefined) => {
  const totalCartAmount = getTotalItemsAmount(items);

  if (!discount) {
    return totalCartAmount;
  }

  return totalCartAmount - calculateDiscount(items, discount);
};

const getDiscountText = (discount: Discount | undefined) => {
  if (!discount) {
    return "";
  }

  if (discount.type === "amount") {
    return `${formatCurrency(
      discount.value / 100,
      cartLocale,
      cartCurrency,
    )} off`;
  }

  if (discount.type === "percent") {
    return `${discount.value / 100}% off`;
  }

  return "";
};

const getTotalItemsAmount = (items: Item[]) =>
  items.reduce(
    (total, item) => total + (item.isFreeItem ? 0 : item.quantity * item.price),
    0,
  );

const calculateDiscount = (
  items: Item[],
  discount: Discount | undefined,
): number => {
  const totalAmountOfItems = getTotalItemsAmount(items);

  if (!discount) {
    return 0;
  }

  if (discount.type === "amount") {
    return discount.value;
  }

  if (discount.type === "percent") {
    return totalAmountOfItems * (discount.value / 100 / 100);
  }

  return 0;
};

const calculateShipping = (shipping: Shipping | undefined) => {
  if (!shipping) {
    return 0;
  }

  return shipping.cost;
};

const generateHash = (item: Partial<Item>) => {
  const itemToHash = {
    id: item.id,
    variantId: item.variantId,
    customIngredients: item.customIngredients,
    spiceLevel: item.spiceLevel,
    grinding: item.grinding,
    variantName: item.variantName,
    variantUnit: item.variantUnit,
  };
  return hash(itemToHash);
};
export const CartProvider: React.FC<{
  children?: React.ReactNode;
  cartId?: string;
  currency?: string;
  locale?: string;
  items?: Item[];
  onItemAdd?: (payload: object) => void;
  onItemUpdate?: (payload: object) => void;
  onItemRemove?: (payload: object) => void;
  onDiscountAdd?: (payload: object) => void;
  onDiscountRemove?: (payload: object) => void;
  onShippingAdd?: (payload: object) => void;
  onShippingRemove?: (payload: object) => void;
  onEmptyCart?: (payload: object) => void;
  onMetadataUpdate?: (payload: object) => void;
  onFreeItemAdded?: (payload: {
    freeItem: Item;
    originalItem: Item;
    freeQuantity: number;
    purchasedQuantity: number;
  }) => void;
  storage?: (
    key: string,
    initialValue: string,
  ) => [string, (value: string | ((prev: string) => string)) => void];
}> = ({
  children,
  cartId,
  currency,
  locale,
  onItemAdd,
  onItemUpdate,
  onItemRemove,
  onDiscountAdd,
  onDiscountRemove,
  onShippingAdd,
  onShippingRemove,
  onEmptyCart,
  onMetadataUpdate,
  onFreeItemAdded,
  storage = cartStorage,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  cartIdentifier = cartId ? cartId : defaultCartId;
  cartCurrency = currency ? currency : defaultCurrency;
  cartLocale = locale ? locale : defaultLocale;
  const [cartState, setCart] = storage(
    cartIdentifier,
    JSON.stringify({
      ...initialState,
      cartId: cartIdentifier,
      currency: cartCurrency,
      locale: cartLocale,
      items: [],
      discount: {},
      shipping: {},
      metadata: {},
    }),
  );

  const [state, dispatch] = React.useReducer(reducer, JSON.parse(cartState));

  // Use useRef to track previous free items (FIX for infinite loop)
  const previousFreeItemsRef = React.useRef<Item[]>([]);

  React.useEffect(() => {
    setCart(JSON.stringify(state));

    // Check for newly added free items
    const currentFreeItems = state.items.filter(
      (item: Item) => item.isFreeItem,
    );

    const previousFreeItems = previousFreeItemsRef.current;

    // Find newly added free items
    const newlyAddedFreeItems = currentFreeItems.filter((freeItem: Item) => {
      return !previousFreeItems.some(
        (prevItem) => prevItem.itemId === freeItem.itemId,
      );
    });

    // Trigger toast for each newly added free item
    newlyAddedFreeItems.forEach((freeItem: Item) => {
      // Find the original item
      const originalItem = state.items.find(
        (item: Item) =>
          !item.isFreeItem && String(item.id) === freeItem.linkedItemId,
      );

      if (originalItem && onFreeItemAdded) {
        // Extract free quantity
        const freeQuantity = parseFloat(freeItem.variantName as string) || 0;
        const unit = originalItem.variantUnit || "gm";
        const variantName = originalItem.variantName
          ? String(originalItem.variantName)
          : "0";
        const itemKg = convertToKg(parseFloat(variantName), unit);
        const purchasedQuantity = itemKg * originalItem.quantity;

        onFreeItemAdded({
          freeItem,
          originalItem,
          freeQuantity,
          purchasedQuantity,
        });
      }
    });

    // Update the ref with current free items (doesn't trigger re-render)
    previousFreeItemsRef.current = currentFreeItems;
  }, [state, setCart, onFreeItemAdded]); // Removed previousFreeItems from dependencies

  const updateItem = (item: Item, quantityChange: number) => {
    const newItem = deepClone(item);
    const itemHash = generateHash(newItem);

    if (!item.id) {
      throw new Error("You must provide an `id` for items");
    }
    if (!item.price) {
      throw new Error("You must provide a `price` for items");
    }

    // Check max_quantity limit
    const maxQuantity = item.max_quantity || 15;
    const currentItem = state.items.find((i: Item) => i.itemId === itemHash);

    if (currentItem) {
      const newQuantity = currentItem.quantity + quantityChange;

      if (newQuantity > maxQuantity && quantityChange > 0) {
        return;
      }
    }

    if (!currentItem) {
      if (quantityChange <= 0) {
        return;
      }

      if (quantityChange > maxQuantity) {
        return;
      }

      const payload = { ...item, itemId: itemHash, quantity: quantityChange };
      dispatch({ type: "ADD_ITEM", payload });
      onItemAdd?.(state.items);
      return;
    }

    const newQuantity = currentItem.quantity + quantityChange;
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", itemId: currentItem.itemId });
      onItemRemove?.(state.items);
      return;
    }

    const payload = { ...currentItem, quantity: newQuantity };
    dispatch({
      type: "UPDATE_ITEM",
      itemId: currentItem.itemId,
      payload,
    });
    onItemUpdate?.(payload);
  };

  // Removes an item from the cart
  const removeItem = (item: Item) => {
    if (!item) {
      throw new Error("You must provide an item to remove");
    }

    const newItem = deepClone(item);
    const itemHash = generateHash(newItem);

    dispatch({ type: "REMOVE_ITEM", itemId: itemHash });
    onItemRemove?.(state.items);
  };

  // Adds a discount to the cart
  const addDiscount = (discount: Discount) => {
    if (!discount) {
      throw new Error("Please provide a discount to add.");
    }

    dispatch({
      type: "ADD_DISCOUNT",
      payload: discount,
    });

    onDiscountAdd?.(discount);
  };

  // Remove a discount from the cart
  const removeDiscount = () => {
    dispatch({
      type: "REMOVE_DISCOUNT",
    });

    onDiscountRemove?.({});
  };

  // Adds shipping value to the cart
  const addShipping = (shipping: Shipping) => {
    if (!shipping) {
      throw new Error("Please provide shipping data to add.");
    }

    dispatch({
      type: "ADD_SHIPPING",
      payload: shipping,
    });

    onShippingAdd?.(shipping);
  };

  // Remove shipping data from the cart
  const removeShipping = () => {
    dispatch({
      type: "REMOVE_SHIPPING",
    });

    onShippingRemove?.({});
  };

  // Sets and updates the cart metadata
  const setMetadata = (metadata: Metadata) => {
    if (!metadata) {
      throw new Error(
        "Please provide metadata to update or set value to `{}`.",
      );
    }

    dispatch({
      type: "SET_CART_META",
      payload: metadata,
    });

    onMetadataUpdate?.(metadata);
  };

  // Clears the set metadata
  const clearMetadata = () => {
    dispatch({
      type: "CLEAR_CART_META",
    });

    onMetadataUpdate?.({});
  };

  // Removes all items from the cart
  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });

    onEmptyCart?.(state.items);
  };

  const getItem = (item: Item) => {
    const itemCopy = deepClone(item);
    const itemHash = generateHash(itemCopy);
    return state.items.find((i: Item) => i.itemId === itemHash);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        isCartOpen,
        openCart,
        closeCart,
        updateItem,
        removeItem,
        getItem,
        setMetadata,
        clearMetadata,
        addDiscount,
        removeDiscount,
        addShipping,
        removeShipping,
        emptyCart,
        currency: currency ? currency : "INR",
        locale: locale ? locale : "en-IN",
        cartId: cartId ? cartId : defaultCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
